<?php

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

// Module Routes
require base_path('app/Modules/Contact/Routes/api.php');
require base_path('app/Modules/Lead/Routes/api.php');
require base_path('app/Modules/Venue/Routes/api.php');

// Auth Routes
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
