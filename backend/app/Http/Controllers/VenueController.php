<?php

namespace App\Http\Controllers;

class VenueController extends Controller
{
    public function index()
    {
        return response()->json([
            ['id' => 1, 'name' => 'Palace & Heritage', 'description' => 'Aspiration and inspiration for your dream day.'],
            ['id' => 2, 'name' => 'Five Star Hotels', 'description' => 'Luxury and comfort in the heart of the city.'],
            ['id' => 3, 'name' => 'Beach Resorts', 'description' => 'Serene views and ocean breezes.'],
        ]);
    }
}
