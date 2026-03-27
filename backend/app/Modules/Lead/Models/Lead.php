<?php

namespace App\Modules\Lead\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
    use HasFactory;

    protected $fillable = [
        'bride_name',
        'groom_name',
        'phone',
        'wedding_date',
        'budget',
        'wedding_type',
        'guest_count',
        'planning_preference',
        'city',
    ];
}
