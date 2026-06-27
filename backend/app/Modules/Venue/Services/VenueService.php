<?php

namespace App\Modules\Venue\Services;

class VenueService
{
    public function getAllVenues(): array
    {
        return [
            ['id' => 1, 'name' => 'Palace & Heritage', 'description' => 'Aspiration and inspiration for your dream day.'],
            ['id' => 2, 'name' => 'Five Star Hotels', 'description' => 'Luxury and comfort in the heart of the city.'],
            ['id' => 3, 'name' => 'Beach Resorts', 'description' => 'Serene views and ocean breezes.'],
            ['id' => 4, 'name' => 'Farmhouse & Open Air', 'description' => 'Natural beauty and open spaces.'],
            ['id' => 5, 'name' => 'Banquet Hall', 'description' => 'Traditional venue for grand celebrations.'],
        ];
    }

    public function getVenueById(int $id): ?array
    {
        $venues = $this->getAllVenues();
        
        foreach ($venues as $venue) {
            if ($venue['id'] === $id) {
                return $venue;
            }
        }
        
        return null;
    }
}
