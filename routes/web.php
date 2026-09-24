<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\SearchController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome');

Route::middleware('guest')->group(function () {
    Route::inertia('/register', 'Auth/Register')->name('show.register');
    Route::inertia('/login', 'Auth/Login')->name('show.login');
    Route::post('/register', [AuthController::class, 'register'])->name('login');
    Route::post('/login', [AuthController::class, 'login'])->name('login');
});



Route::middleware('auth')->group(function () {
    Route::get('/home', [HomeController::class, 'index'])->name('index.home');
    Route::patch('/home/{id}', [HomeController::class, 'update'])->name('update.home');
    
    Route::get('/search', [SearchController::class, 'index'])->name('index.search');

    Route::post('logout', [AuthController::class, 'logout'])->name('logout');
});
