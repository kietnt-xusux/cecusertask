<?php

namespace App\Http\Controllers\Api;

use App\Helper\Common;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Http\Resources\DesignerResource;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends ApiController
{
    /**
     * @param User $model
     * @param string $action
     * @return string[]
     */
    protected function _validateRule($model, $action = 'store'): array
    {
        return [
            'name' => 'required',
            'name_kana' => 'nullable',
            'email' => [
                'required',
                'email',
                $action === 'store' ? Rule::unique('users') : Rule::unique('users')->ignore($model->id)
            ],
            'password' => $action === 'store' ? 'required|min:4' : 'nullable|min:4',
            'role' => 'required',
        ];
    }

    public function index()
    {
        $condition = request()->query('search_text', '');
        $perPage = request()->query('per_page', 10);
        $sortField = request()->query('sort_field', '');
        $sortValue = request()->query('sort_value', 'asc');
        $kind = request('kind');
        // dd(request());
        $query = User::query();
        if (!empty($sortField)) $query->orderBy($sortField, $sortValue);

        return UserResource::collection($query->paginate($perPage));
    }

    function getUser() {
        $id = request()->query('id', 0);
        $query = User::query()->where('id', $id)->first();

        return new UserResource($query);
    }

    // function update(User $user) {
    //     $data = [
    //         'name' => request()->name,
    //         'name_kana' => request()->name_kana,
    //         'email' => request()->email,
    //         'role' => request()->role,
    //     ];

    //     if (!empty(request()->password)) {
    //         $data['password'] = $request()->password;
    //     }

    //     $user->update($data);

    //     return response([
    //         'status' => 'OK',
    //     ], 200);
    // }

    protected function _getDataUpdate($item): array
    {
        $data = parent::_getDataUpdate($item);
        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }
        return $data;
    }

    protected function _getDataCreate(): array
    {
        $data = parent::_getDataCreate();
        $data['password'] = Hash::make($data['password']);
        $data['remember_token'] = Str::random(10);
        return $data;
    }

    public function updateProfile(): UserResource
    {
        $user = User::query()->where(['id' => auth()->user()->id])->first();
        $user->name = request()->name;

        if (!empty(request()->file('picture'))) {

            if (!empty($user->picture)) {
                $parsed = parse_url($user->picture);
                Storage::disk('public')->delete(str_replace('/storage/', '', $parsed['path']));
            }

            $link = Storage::disk('public')->put('avatars', request()->file('picture'));
            $user->picture = asset('storage/' . $link);
        }

        if (!empty(request()->file('stamp'))) {

            if (!empty($user->stamp)) {
                $parsed = parse_url($user->stamp);
                Storage::disk('public')->delete(str_replace('/storage/', '', $parsed['path']));
            }

            $link = Storage::disk('public')->put('stamps', request()->file('stamp'));
            $user->stamp = asset('storage/' . $link);
        }

        $user->save();

        return new UserResource($user);
    }

    public function updatePassword()
    {
        $user = auth()->user();

        if (!Hash::check(request()->oldPass, $user->password)) {
            return response([
                'status' => 'FAIL',
                'message' => '古いパスワードが正しくありません。',
            ], 400);
        }
        $user->password = Hash::make(request()->newPass);
        $user->email_verified_at = Date::now();
        $user->save();

        $currentToken = $user->currentAccessToken();
        $ids = $user->tokens()->whereNotIn('id', [$currentToken->id])->pluck('id');
        $user->tokens()->whereNotIn('id', [$currentToken->id])->delete();
        foreach ($ids as $id) {
            Cache::forget("PersonalAccessToken::$id");
        }

        return response([
            'status' => 'OK',
        ]);
    }

    public function updateFirstPassword()
    {
        $user = auth()->user();

        if (!$user->first_login) {
            return response([
                'status' => 'FAIL',
            ], 400);
        }

        $user->password = Hash::make(request()->newPass);
        $user->first_login = 0;
        $user->save();

        return response([
            'status' => 'OK',
        ]);
    }

    /**
     * Get designer list
     * @return JsonResponse
     */
    public function designers(): JsonResponse
    {
        $designers = User::query()->where(['role' => 'designer'])->get();
        return response()->json([
            'status' => 'OK',
            'designers' => DesignerResource::collection($designers),
        ]);
    }
}
