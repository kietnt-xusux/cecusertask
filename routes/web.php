<?php

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

Route::get('/test', function () {
    return 'First sub domain';
})->domain('blog.next-js.test');


/**
 * Route serving static file in build folder: js, css, image
 */
Route::get('/build/_next/{any?}', function ($any = null) {
    $path = public_path('build/_next/'.$any);
    if (File::exists($path)) {
        return response()->file($path);
    }
    abort(404);
})->where('any', '.*');

Route::get('/build/static/{any?}', function ($any = null) {
    $path = public_path('build/static/'.$any);
    if (File::exists($path)) {
        return response()->file($path);
    }
    abort(404);
})->where('any', '.*');

/**
 * Route serving html file in build folder
 */
$array = ['index', 'profile'];
foreach ($array as $item) {
    Route::get('/'.$item, function () use ($item) {
        $path = public_path('build/'.$item.'.html');
        if (File::exists($path)) {
            return response()->file($path);
        }
        abort(404);
    })->where('any', '.*');
}

