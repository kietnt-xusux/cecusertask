<?php

namespace App\Http\Controllers\Api;

use App\Helper\Common;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Mail\ResetPassword;
use App\Models\PasswordResets;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function login(): JsonResponse
    {
        $credentials = request(['email', 'password']);

        if (!auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken(auth()->user()->createToken('services', [auth()->user()->role])->plainTextToken);
    }

    public function logout(): JsonResponse
    {
        $user = auth()->user();
        if (!empty($user)) $user->currentAccessToken()->delete();
        Auth::guard('web')->logout();
        return response()->json(['message' => 'ログアウトしました。']);
    }

    public function me(): JsonResponse
    {
        $user = User::query()->where(['id' => auth()->user()->id])->first();
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

    public function checkToken()
    {
        $token = request()->token;
        if (empty($token)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $exist = User::query()->where('remember_token', '=', $token)
            ->whereNull('email_verified_at')->first();
        if (empty($exist)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        return new UserResource($exist);
    }

    public function checkResetToken()
    {
        $token = request()->token;
        if (empty($token)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $exist = PasswordResets::query()->orderBy('created_at', 'DESC')->first();

        if (empty($exist) || $exist->token !== $token) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $date = Carbon::parse($exist->created_at);
        $now = Carbon::now();
        $diff = $date->diffInDays($now);
        if ($diff >= 2) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $user = User::query()->where('email', '=', $exist->email)->first();
        if (empty($user)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        return new UserResource($user);
    }


    public function createPassword()
    {
        $token = request()->token;
        $password = request()->password;
        if (empty($token) || empty($password)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $exist = User::query()->where('remember_token', '=', $token)
            ->whereNull('email_verified_at')->first();
        if (empty($exist)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $exist->password = Hash::make($password);
        $exist->markEmailAsVerified();
        $exist->save();

        return new UserResource($exist);
    }

    public function checkEmail()
    {
        $email = request()->email;
        if (empty($email)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $exist = User::query()->where('email', '=', $email)->first();
        if (empty($exist)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $token = Common::generateRandomString();
        PasswordResets::create([
            'email' => $email,
            'token' => $token,
            'created_at' => Date::now()
        ]);
        if (env('APP_ENV') !== 'local') Mail::to($exist['email'])->send(new ResetPassword($exist, $token));

        return new UserResource($exist);
    }

    /**
     * @throws Exception
     */
    public function resetPassword()
    {
        $token = request()->token;
        $password = request()->password;
        $email = request()->email;
        if (empty($token) || empty($password) || empty($email)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $exist = PasswordResets::query()->where('token', '=', $token)->first();
        if (empty($exist) || $exist->email !== $email) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $user = User::query()->where('email', '=', $email)->first();
        if (empty($user)) {
            return response([
                'status' => 'FAIL',
                'message' => 'Not Found'
            ], 404);
        }

        $user->password = Hash::make($password);
        $user->save();
        DB::table('password_resets')->where('email', $email)->delete();

        return new UserResource($user);
    }

    protected function respondWithToken($token): JsonResponse
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'detail' => [
                'name' => auth()->user()->name,
                'email' => auth()->user()->email,
                'role' => auth()->user()->role,
                'picture' => auth()->user()->picture,
                'stamp' => auth()->user()->stamp,
                'first_login' => auth()->user()->first_login,
            ],
        ]);
    }
}
