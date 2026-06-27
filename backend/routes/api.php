<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Module Routes
require base_path('app/Modules/Contact/Routes/api.php');
require base_path('app/Modules/Lead/Routes/api.php');
require base_path('app/Modules/Venue/Routes/api.php');

// Auth Routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
