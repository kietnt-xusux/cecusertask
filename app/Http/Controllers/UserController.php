<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;
use Illuminate\Support\Str;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Storage;

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
            'avatar' => 'nullable|string',
        ];
    }

    protected function _beforeSave($data, $action = 'store')
    {
        // Auto-set missing fields for new users
        if ($action === 'store') {
            $data['email_verified_at'] = now();
            $data['remember_token'] = Str::random(10);
        }
        
        // Handle password for updates - only hash if provided
        if ($action === 'update' && empty($data['password'])) {
            unset($data['password']); // Remove empty password to keep current one
        }
        
        // Handle avatar - convert base64 to file if needed
        if (isset($data['avatar']) && !empty($data['avatar'])) {
            $avatar = $data['avatar'];
            
            \Log::info('Avatar data received:', [
                'avatar_length' => strlen($avatar),
                'avatar_start' => substr($avatar, 0, 50),
                'is_base64' => strpos($avatar, 'data:image') === 0
            ]);
            
            // Check if it's a base64 data URL
            if (strpos($avatar, 'data:image') === 0) {
                \Log::info('Processing base64 avatar...');
                // For update, we need to get the user ID from the request
                $userId = null;
                if ($action === 'update') {
                    $userId = request()->route('user'); // Get user ID from route parameter
                }
                $data['avatar'] = $this->saveBase64Image($avatar, $userId);
                \Log::info('Avatar saved, new value:', ['avatar' => $data['avatar']]);
            } else {
                \Log::info('Avatar is not base64, keeping as is');
            }
        } else {
            // Set default avatar if no avatar is provided
            $data['avatar'] = 'https://via.placeholder.com/100x100.png/005555?text=user';
            \Log::info('No avatar provided, using default');
        }
        
        // Log the data being set
        \Log::info('Setting user data in _beforeSave:', $data);
        
        return $data;
    }

    /**
     * Save base64 image to storage and return the path
     */
    private function saveBase64Image($base64String, $userId = null)
    {
        try {
            // Extract the base64 data
            $image_parts = explode(";base64,", $base64String);
            if (count($image_parts) !== 2) {
                return 'https://via.placeholder.com/100x100.png/005555?text=user';
            }
            
            $image_type_aux = explode("image/", $image_parts[0]);
            $image_type = $image_type_aux[1];
            $image_base64 = base64_decode($image_parts[1]);
            
            // Generate unique filename
            $filename = 'avatar_' . ($userId ?? time()) . '_' . uniqid() . '.' . $image_type;
            $path = 'avatars/' . $filename;
            
            // Save to storage
            Storage::disk('public')->put($path, $image_base64);
            
            // Return the public URL
            return Storage::disk('public')->url($path);
            
        } catch (\Exception $e) {
            \Log::error('Error saving base64 image: ' . $e->getMessage());
            return 'https://via.placeholder.com/100x100.png/005555?text=user';
        }
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
