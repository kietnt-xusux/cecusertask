<?php

namespace App\Http\Controllers\Api;

use App\Enums\Role;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class AuthController extends ApiController
{
    protected bool $_crud = false;

    public function login(): JsonResponse
    {
        $credentials = request(['email', 'password']);
        $remember = request('remember');

        $email = $credentials['email'];
        $credentials['email'] = function ($query) use ($email) {
            return $query->orWhere('email', $email)
                ->orWhere('line_work_email', $email);
        };

        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken(auth()->user()->createToken(
            'services',
            [$this->_getAbility()],
            $remember ? null : now()->addMonth()
        )->plainTextToken);
    }

    public function logout(): JsonResponse
    {
        if (request()->user('sanctum')) {
            $user = request()->user('sanctum');
            auth()->logout();
            if (!empty($user)) $user->currentAccessToken()->delete();
        }
        return response()->json([
            'status' => 'OK',
        ]);
    }

    public function me(): JsonResponse
    {
        $user = User::query()->where(['id' => auth()->id()])->first();
        return response()->json(new UserResource($user));
    }

    public function register(Request $request): UserResource
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:4',
        ]);

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        return new UserResource($user);
    }

    public function checkToken(): UserResource|JsonResponse
    {
        request()->validate([
            'token' => 'required',
            'email' => 'required|email',
        ]);
        $user = User::query()->where(['email' => request('email')])->first();
        $exist = Password::tokenExists($user, request('token'));

        if (empty($exist)) {
            return $this->responseNotFound();
        }

        return response()->json([
            'status' => 'OK',
        ]);
    }

    public function forgotPassword(): JsonResponse
    {
        request()->validate(['email' => 'required|email|exists:users,email']);
        Password::sendResetLink(request()->only('email'));

        return response()->json([
            'status' => 'OK',
        ]);
    }

    /**
     * @throws Exception
     */
    public function resetPassword(): JsonResponse
    {
        request()->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        Password::reset(
            request()->only('email', 'password', 'token'),
            function (User $user, string $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
                $user->save();

                $user->tokens()->delete();
            }
        );

        return response()->json([
            'status' => 'OK',
        ]);
    }

    public function updateProfile(): UserResource
    {
        $user = auth()->user();
        $data = request()->validate([
            'name' => 'nullable',
            'tel' => 'nullable',
            'password' => 'nullable',
        ]);
        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }
        $user->fill($data);

        if (!empty(request()->file('picture'))) {

            if (!empty($user->picture)) {
                $parsed = parse_url($user->picture);
                Storage::disk('public')->delete(str_replace('/storage/', '', $parsed['path']));
            }

            $link = Storage::disk('public')->put('avatars', request()->file('picture'));
            $user->picture = asset('storage/' . $link);
        }

        $user->save();

        return new UserResource($user);
    }

    public function updatePassword(): JsonResponse
    {
        $user = auth()->user();

        if (!Hash::check(request('oldPass'), $user->password)) {
            return response()->json([
                'status' => 'FAIL',
                'message' => '古いパスワードが正しくありません。',
            ], 400);
        }
        $user->password = Hash::make(request("newPass"));
        $user->save();

        $currentToken = $user->currentAccessToken();
        $user->tokens()->whereNotIn('id', [$currentToken->id])->delete();

        return response()->json([
            'status' => 'OK',
        ]);
    }

    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'detail' => new UserResource(auth()->user()),
        ]);
    }

    protected function _getAbility(): string
    {
        $role = auth()->user()->role;

        if ($role == Role::ADMIN->value) return "admin";
        if ($role == Role::MANAGER->value) return "manager";
        return "user";
    }
}
