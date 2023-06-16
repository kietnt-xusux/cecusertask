<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'name_kana' => $this->name_kana,
            'email' => $this->email,
            'role' => $this->role,
            'picture' => $this->picture,
            'email_verified_at' => $this->email_verified_at,
            'created_at' => date('Y年m月d日', strtotime($this->created_at)),
        ];
    }
}
