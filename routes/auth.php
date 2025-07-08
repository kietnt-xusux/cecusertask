<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', function () {
        return Inertia::render('admin/login');
    })->name('login');
    Route::post('/admin/login', [AuthController::class, 'store'])->name('admin.auth.store');
});

Route::middleware('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'destroy'])->name('logout');
    Route::get('/profile', [AuthController::class, 'profile'])->name('profile');
});
