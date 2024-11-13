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

Route::namespace('Api')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('forgot-password', [AuthController::class, 'forgotPassword']);
    Route::put('forgot-password', [AuthController::class, 'checkToken']);
    Route::post('reset-password', [AuthController::class, 'resetPassword']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
});

Route::middleware(['auth:sanctum', 'ability:admin'])->group(function () {
    Route::post('update-profile', [AuthController::class, 'updateProfile']);
    Route::apiResource('user', UserController::class);
});
