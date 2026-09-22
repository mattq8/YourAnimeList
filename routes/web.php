<?php

use Illuminate\Support\Facades\Route;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::inertia('/', 'Welcome');
Route::inertia('/register', 'Auth/Register');
route::inertia('/login', 'Auth/Login');