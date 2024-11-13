<?php

namespace App\Http\Controllers\Api;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class UserController extends ApiController
{
    protected array $_searchFields = ['name', 'email', 'employee_code', 'name_kana'];

    /**
     * @param  User  $model
     * @param  string  $action
     *
     * @return string[]
     */
    protected function _validateRule($model, $action = 'store'): array
    {
        return [
            'name'            => 'required',
            'name_kana'       => 'nullable',
            'email'           => [
                'required',
                'email',
                $action === 'store' ?
                    Rule::unique('users') :
                    Rule::unique('users')->ignore($model->id)
            ],
            'password'        => $action === 'store' ? 'required|min:4' : 'nullable|min:4',
            'role'            => 'required',
            'line_work_id'    => 'nullable',
            'line_work_email' => 'nullable',
            'department'      => 'nullable',
            'position'        => 'nullable',
            'template_id'     => 'nullable',
            'tel'             => 'nullable',
            'employee_code'   => 'nullable',
            'division'        => 'nullable',
        ];
    }

    public function index()
    {
        $condition   = request()->query('search_text', '');
        $perPage     = request()->query('per_page', 10);
        $sortField   = request()->query('sort_field', 'id');
        $sortValue   = request()->query('sort_value', 'asc');

        $query = User::query();
        $query->orderBy($sortField, $sortValue);
        if (!empty($condition)) {
            $searchFields = $this->_searchFields;
            $searchValue  = preg_split('/\s|　/', $condition);
            foreach ($searchValue as $value) {
                $query->where(function ($q) use ($searchFields, $value) {
                    foreach ($searchFields as $searchField) {
                        $q->orWhere($searchField, 'LIKE', '%'.$value.'%');
                    }
                });
            }
        }

        if (!empty($showDeleted)) {
            $query->onlyTrashed();
        }

        return UserResource::collection($query->paginate($perPage));
    }

    public function show()
    {
        $userId = request()->user;
        $user   = User::query()->where(['id' => $userId])->first();
        if (empty($user)) {
            return $this->responseNotFound();
        }
        return UserResource::make($user);
    }

    protected function _getDataCreate(): array
    {
        $data                   = parent::_getDataCreate();
        $data['password']       = Hash::make($data['password']);
        $data['remember_token'] = Str::random(60);
        return $data;
    }

    protected function _getDataUpdate($item): array
    {
        $data = parent::_getDataUpdate($item);
        if (empty($data['password'])) {
            unset($data['password']);
        }
        else {
            $data['password'] = Hash::make($data['password']);
        }
        return $data;
    }



    public function restore(): JsonResponse
    {
        $id = request('id');
        if (empty($id)) {
            return $this->responseNotFound();
        }
        $user = User::withTrashed()->findOrFail($id);
        if (empty($user)) {
            return $this->responseNotFound();
        }
        $user->restore();

        return response()->json([
            'status' => 'OK',
        ]);
    }
}
