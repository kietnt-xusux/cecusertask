<?php

use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Route;
use GuzzleHttp\Client;

if (config('app.env') === 'local') {
    Route::any('/{any?}', function($any = null) {
        $https = 'http';
        $domain = 'localhost:3000';

        $client = new Client();
        $headers = collect(request()->headers->all())
            ->map(function ($item, $key) { return $item[0]; })
            ->all();
        $headers['host'] = $domain;

        $opts = [
            'http_errors' => false,
            'verify' => false,
            'allow_redirects' => ['max' => 10],
            'timeout' => 10,
            'connect_timeout' => 10,
            'read_timeout' => 10,
            'headers' => $headers,
            'body' => json_encode(request()->all()),
        ];

        if (request()->method() === 'POST') {
            $a = 2;
        }

        $response = $client->request(
            request()->method(),
            $https.'://'.$domain.'/'.$any,
            $opts
        );

        return response($response->getBody()->getContents(), $response->getStatusCode())->withHeaders($response->getHeaders());
    })->where('any', '.*');
} else {
    /**
     * Route serving static file in build folder: js, css, image
     */
    Route::get('/{any}', function (string $any) {
        $path = public_path('build/' . $any);
        if (File::exists($path)) {
            return response()->file($path);
        }
        abort(404);
    })->where('any', '^\/build.*|.*txt$');

    Route::get('/{any?}', function ($any = null) {
        $path = public_path('build/' . $any . '.html');
        if (File::exists($path)) {
            return response()->file($path);
        }
        return response()->file('build/404.html');
    })->where('any', '.*');
}
