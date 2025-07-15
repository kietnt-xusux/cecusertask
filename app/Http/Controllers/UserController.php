<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\Rule;

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

    protected function _extendIndexQuery($query): array
    {
        $roles = request('role');

        if ($roles) {
            $query->whereIn('role', explode(',', $roles));
        }

        return [$query, ['role' => $roles ?? null]];
    }
}
