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

if (!function_exists('getTimeAgo')) {
    function getTimeAgo($date, $full = false): string
    {
        $now  = now();
        $ago  = date('Y-m-d H:i:s', strtotime($date));
        $diff = $now->diff($ago);

        $diff->w = floor($diff->d / 7);
        $diff->d -= $diff->w * 7;

        $string = array(
            'y' => 'year',
            'm' => 'month',
            'w' => 'week',
            'd' => 'day',
            'h' => 'hour',
            'i' => 'minute',
            's' => 'second',
        );
        foreach ($string as $k => &$v) {
            if ($diff->$k) {
                $v = $diff->$k . ' ' . $v . ($diff->$k > 1 ? 's' : '');
            } else {
                unset($string[$k]);
            }
        }

        if (!$full)
            $string = array_slice($string, 0, 1);
        return $string ? implode(', ', $string) . ' ago' : 'just now';
    }
}

if (!function_exists('sliceDate')) {
    function sliceDate($date, $format): string
    {
        return date($format, strtotime($date));
    }
}

if (!function_exists('formatMoney')) {
    function formatMoney($price): string
    {
        return number_format($price) . ' 円';
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

if (!function_exists('timeToDecimal')) {
    function timeToDecimal($time): int
    {
        $timeArr = explode(':', $time);
        return ($timeArr[0] * 60) + ($timeArr[1]) + ($timeArr[2] / 60);
    }
}

if (!function_exists('decimalToTime')) {
    function decimalToTime($decimal): string
    {
        $hours   = floor($decimal / 60);
        $minutes = floor($decimal % 60);
        $seconds = $decimal - (int)$decimal;
        $seconds = round($seconds * 60);

        return str_pad($hours, 2, "0", STR_PAD_LEFT) . ":" . str_pad($minutes, 2, "0", STR_PAD_LEFT) . ":" . str_pad($seconds, 2, "0", STR_PAD_LEFT);
    }
}

if (!function_exists('base64UrlEncode')) {
    function base64UrlEncode($data): string
    {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}

if (!function_exists('countDayOfMonth')) {
    function countDayOfMonth($year, $month, $arrayTypeDay): array
    {
        $days      = [];
        $firstDate = $year . '-' . $month . '-01';
        $lastDate  = date('t', strtotime($firstDate));

        $workdays = [];
        foreach ($arrayTypeDay as $key => $value) {
            if ($value == 1) {
                $workdays[] = $key;
            }
        }

        for ($d = 1; $d <= $lastDate; $d++) {
            $t = Carbon::create($year, $month, $d);
            if (in_array($t->format('l'), $workdays)) {
                $days[] = $t->format('Y-m-d');
            }
        }

        return $days;
    }
}


if (!function_exists('countCurrentDay')) {
    function countCurrentDay(int $year, int $month, $holidays): array
    {
        $days      = [];
        $monthNow  = (int)date('m');
        $yearNow   = (int)date('Y');
        $dateNow   = date('d') > 1 ? date('d') - 1 : date('d');
        $firstDate = $year . '-' . $month . '-01';

        if ($yearNow > $year)
            return countDayOfMonth($year, $month, $holidays);
        if ($yearNow < $year)
            return [];
        if ($monthNow < $month)
            return [];

        $lastDate = $monthNow == $month ? $dateNow : date('t', strtotime($firstDate));

        for ($d = 1; $d <= $lastDate; $d++) {
            $time = mktime(12, 0, 0, $month, $d, $year);
            if (
                (date('m', $time) == $month && (date('D', $time) != 'Sat'))
                && (date('m', $time) == $month && (date('D', $time) != "Sun"))
                && !in_array(date('Y-m-d', $time), $holidays)
            ) {
                $days[] = date('Y-m-d', $time);
            }
        }

        return $days;
    }
}

