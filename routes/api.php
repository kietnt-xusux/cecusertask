<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/test', function () {
    echo json_encode($_SERVER['REQUEST_METHOD']);
});

Route::namespace('Api')->group(function () {
    Route::post('login', [AuthController::class, 'login']);
    // Route::post('check-token', [AuthController::class, 'checkToken']);
    // Route::post('check-reset-token', [AuthController::class, 'checkResetToken']);
    // Route::post('check-email', [AuthController::class, 'checkEmail']);
    // Route::post('create-password', [AuthController::class, 'createPassword']);
    // Route::post('reset-password', [AuthController::class, 'resetPassword']);

});

Route::middleware('auth:sanctum')->group(function () {
    /** Users */
    Route::group(['prefix' => 'users', 'namespace' => 'api', 'name' => 'users'], function () {
        Route::get('/', [UserController::class, 'index']);
        // Route::get('/search', [UserController::class, 'search']);
        Route::post('/create', [UserController::class, 'store']);
        Route::post('/{user}/update', [UserController::class, 'update']);
        Route::post('/{user}/delete', [UserController::class, 'destroy']);
        Route::get('/get-user', [UserController::class, 'getUser']);

        // Route::post('/{user}/update', [UserController::class, 'update']);
        // Route::get('/get-user-by-id', [UserController::class, 'getUserById']);
        // Route::post('/export', [UserController::class, 'export']);
        // Route::post('/delete', [UserController::class, 'delete']);
    });


    // Route::put('update-profile', [UserController::class, 'updateProfile']);
    // Route::post('update-password', [UserController::class, 'updatePassword']);
    // Route::post('update-first-password', [UserController::class, 'updateFirstPassword']);
    // Route::get('me', [AuthController::class, 'me']);
    // Route::post('logout', [AuthController::class, 'logout']);


});
