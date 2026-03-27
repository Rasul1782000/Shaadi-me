<?php

namespace App\Modules\Venue\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Venue\Services\VenueService;

class VenueController extends Controller
{
    protected $venueService;

    public function __construct(VenueService $venueService)
    {
        $this->venueService = $venueService;
    }

    public function index()
    {
        $venues = $this->venueService->getAllVenues();
        
        return response()->json($venues, 200);
    }

    public function show($id)
    {
        $venue = $this->venueService->getVenueById($id);
        
        if (!$venue) {
            return response()->json([
                'message' => 'Venue not found'
            ], 404);
        }
        
        return response()->json($venue, 200);
    }

    public function VentureType()
    {
        return response()->json([
            ['id' => 1, 'name' => 'Palace & Heritage', 'description' => 'Aspiration and inspiration for your dream day.'],
            ['id' => 2, 'name' => 'Five Star Hotels', 'description' => 'Luxury and comfort in the heart of the city.'],
            ['id' => 3, 'name' => 'Beach Resorts', 'description' => 'Serene views and ocean breezes.'],
        ]);
    }
}
