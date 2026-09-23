<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome');

Route::middleware('guest')->group(function () {
    Route::inertia('/register', 'Auth/Register')->name('show.register');
    Route::inertia('/login', 'Auth/Login')->name('show.login');
    Route::post('/register', [AuthController::class, 'register'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});

Route::post('logout', [AuthController::class, 'logout'])->name('logout');

Route::middleware('auth')->group(function () {
    Route::inertia('/home', 'Home')->name('home');
});
