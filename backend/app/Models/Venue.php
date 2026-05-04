<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Venue extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'city',
        'address',
        'capacity',
        'price_per_day',
        'type',
        'amenities',
        'contact_phone',
        'contact_email',
        'is_active',
    ];

    protected $casts = [
        'amenities' => 'array',
        'is_active' => 'boolean',
        'price_per_day' => 'integer',
        'capacity' => 'integer',
    ];
}
