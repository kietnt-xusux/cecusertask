<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::domain('api.next-js.test')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::put('forgot-password', [AuthController::class, 'checkToken']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);

    Route::apiResource('user', UserController::class);
});



