<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Venue\Controllers\VenueController;

Route::prefix('venues')->group(function () {
    Route::get('/', [VenueController::class, 'index']);
    Route::get('/{id}', [VenueController::class, 'show']);
    Route::get('/types', [VenueController::class, 'VentureType']);
});
