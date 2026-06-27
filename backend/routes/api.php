<?php

use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\VenueController;
use Illuminate\Support\Facades\Route;

Route::post('/leads', [LeadController::class, 'store'])
     ->middleware('throttle:lead-submit');
Route::get('/leads', [LeadController::class, 'index']);
Route::get('/venues', [VenueController::class, 'index']);
