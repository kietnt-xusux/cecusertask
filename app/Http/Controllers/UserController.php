<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class UserController extends DefaultController
{
    protected function _validateRule($model, $action = 'store'): array
    {
        return [
            'name' => 'required',
            'email' => [
                'required',
                'email',
                $action === 'store' ? Rule::unique('users') : Rule::unique('users')->ignore($model->id)
            ],
            'password' => $action === 'store' ? 'required|min:4' : 'nullable|min:4',
            'role' => 'required',
        ];
    }

    protected function _beforeSave($data, $action = 'store')
    {
        // Auto-set missing fields for new users
        if ($action === 'store') {
            $data['email_verified_at'] = now();
            $data['remember_token'] = Str::random(10);
            
            // Only set default avatar if no avatar is provided at all
            if (!isset($data['avatar']) || $data['avatar'] === '') {
                $data['avatar'] = 'https://via.placeholder.com/100x100.png/005555?text=user';
            }
            
            // Log the data being set
            \Log::info('Setting user data in _beforeSave:', $data);
        }
        
        // Handle password for updates - only hash if provided
        if ($action === 'update' && empty($data['password'])) {
            unset($data['password']); // Remove empty password to keep current one
        }
        
        // Handle avatar for updates - keep current if not provided
        if ($action === 'update' && empty($data['avatar'])) {
            unset($data['avatar']); // Remove empty avatar to keep current one
        }
        
        return $data;
    }

    protected function _afterSave($item, $action = 'store')
    {
        // Add any post-save logic here
    }

    protected function _beforeDelete($item)
    {
        // Prevent deletion of admin users
        if ($item->role === 6) { // Admin role
            throw new \Exception('Cannot delete admin users');
        }
        
        // Prevent deletion of the current logged-in user
        if ($item->id === auth()->id()) {
            throw new \Exception('Cannot delete your own account');
        }
    }

    protected function _extendIndexQuery($query): array
    {
        $roles = request('role');

        if ($roles) {
            $query->whereIn('role', explode(',', $roles));
        }

        return [$query, ['role' => $roles ?? null]];
    }
}
