<?php

namespace App\Http\Resources;

use App\Enums\Role;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'                    => $this->id,
            'name'                  => $this->name,
            'name_kana'             => $this->name_kana,
            'email'                 => $this->email,
            'role'                  => $this->role,
            'email_verified_at'     => Carbon::create($this->email_verified_at)->format('Y-m-d H:i:s'),
            'picture'               => $this->picture,
            'department'            => $this->department,
            'position'              => $this->position,
            'tel'                   => $this->tel,
            'employee_code'         => $this->employee_code,
            'division'              => $this->division,
            'template_id'           => $this->template_id,
            'created_at'            => Carbon::create($this->created_at)->format('Y-m-d H:i:s'),
            'deleted_at'            => $this->deleted_at ? Carbon::create($this->deleted_at)->format('Y-m-d H:i:s') : null,
        ];
    }
}
