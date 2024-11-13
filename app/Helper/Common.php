<?php

use Carbon\Carbon;
use Illuminate\Support\Arr;
use Illuminate\Support\Str;

if (!function_exists('getLocale')) {
    function getLocale(): string
    {
        return app()->getLocale();
    }
}

if (!function_exists('checkLocale')) {
    function checkLocale($locale): bool
    {
        return app()->isLocale($locale);
    }
}

if (!function_exists('getFullQuery')) {
    function getFullQuery($query)
    {
        $sql = $query->toSql();
        foreach ($query->getBindings() as $binding) {
            $value = is_numeric($binding) ? $binding : "'" . $binding . "'";
            $sql   = preg_replace('/\?/', $value, $sql, 1);
        }
        return $sql;
    }
}

if (!function_exists('formatDate')) {
    function formatDate($date): string
    {
        return date('Y-m-d', strtotime($date));
    }
}

if (!function_exists('formatDateTime')) {
    function formatDateTime($date): string
    {
        if (empty($date)) return '';
        return date('Y-m-d H:i:s', strtotime($date));
    }
}

if (!function_exists('formatTime')) {
    function formatTime($date): string
    {
        return date('H:i', strtotime($date));
    }
}


if (!function_exists('shortString')) {
    /**
     * Making short string
     *
     * @param      $string
     * @param int  $char
     * @param bool $hasDot
     * @return string
     */
    function shortString($string, int $char = 30, bool $hasDot = true): string
    {
        $newString = substr($string, 0, $char);
        return $hasDot ? $newString . ' ...' : $newString;
    }
}

if (!function_exists('formatDigits')) {

    /**
     * Number format 5 digits
     *
     * @param $number
     * @param $length
     * @return string
     */
    function formatDigits($number, $length): string
    {
        return str_pad($number, $length, '0', STR_PAD_LEFT);
    }
}

if (!function_exists('randomString')) {
    /**
     * @param int $length
     * @return string
     * @throws Exception
     */
    function randomString(int $length = 64): string
    {
        $length = ($length < 4) ? 4 : $length;
        return bin2hex(random_bytes(($length - ($length % 2)) / 2));
    }
}


if (!function_exists('isNotEmptyInArray')) {
    function isNotEmptyInArray(array $array, string $key): bool
    {
        return Arr::exists($array, $key) && Str::of($array[$key])->trim()->isNotEmpty();
    }
}


