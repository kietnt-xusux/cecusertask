<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class DefaultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request): array
    {
        $data = $this->resource->toArray();
        Arr::set($data, 'created_at', $this->created_at?->format('Y年m月d日 H:i'));
        return $data;
    }
}
