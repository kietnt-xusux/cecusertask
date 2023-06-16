<?php

namespace App\Models;

use App\Jobs\UpdatePersonalAccessToken;
use Exception;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    public static function boot()
    {
        parent::boot();
        // When updating, cancel normal update and manually update
        // the table asynchronously every hour.
        static::updating(function ($personalAccessToken) {
            $id = $personalAccessToken->getKey();
            if (Cache::has("PersonalAccessToken::$id")) {
                return false;
            }
            return true;
        });
    }

    public static function findToken($token)
    {
        [$id, $token] = explode('|', $token, 2);
        $personToken = Cache::remember("PersonalAccessToken::$id", 86400, function () use ($token) {
            return parent::findToken($token) ?? '_null_';
        });
        if ($personToken === '_null_') {
            return null;
        }
        return $personToken;
    }

    public function getTokenableAttribute()
    {
        return Cache::remember("PersonalAccessToken::{$this->id}::tokenable", 86400, function () {
            return parent::tokenable()->first();
        });
    }
}
