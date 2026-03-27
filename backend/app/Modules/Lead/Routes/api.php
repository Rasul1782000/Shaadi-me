<?php

use Illuminate\Support\Facades\Route;
use App\Modules\Lead\Controllers\LeadController;

Route::prefix('leads')->group(function () {
    Route::get('/', [LeadController::class, 'index']);
    Route::post('/', [LeadController::class, 'store']);
    Route::get('/{id}', [LeadController::class, 'show']);
    Route::delete('/{id}', [LeadController::class, 'delete']);
});
