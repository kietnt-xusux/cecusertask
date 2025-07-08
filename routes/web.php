<?php

use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', function () {
        return Inertia::render('admin/dashboard');
    })->name('dashboard');

    Route::resource('users', UserController::class);
});

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

require __DIR__.'/auth.php';
