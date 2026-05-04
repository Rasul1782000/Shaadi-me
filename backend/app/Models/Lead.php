<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'bride_name',
        'groom_name',
        'email',
        'phone',
        'community',
        'city',
        'wedding_date',
        'guests',
        'venue_type',
        'budget',
        'styles',
        'services',
        'events',
        'notes',
        'referral',
        'status',
    ];

    protected $casts = [
        'styles' => 'array',
        'services' => 'array',
        'events' => 'array',
    ];
}
