<?php

namespace Database\Seeders;

use App\Models\Venue;
use Illuminate\Database\Seeder;

class VenueSeeder extends Seeder
{
    public function run(): void
    {
        $venues = [
            // Hyderabad
            ['name' => 'Falaknuma Palace', 'description' => 'A restored 19th-century palace perched atop a hill, offering regal grandeur and panoramic city views.', 'city' => 'Hyderabad', 'type' => 'heritage', 'capacity' => 500, 'image' => 'https://images.pexels.com/photos/2042109/pexels-photo-2042109.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'Taj Krishna', 'description' => 'Luxury hotel in Banjara Hills with lush gardens and elegant ballrooms for grand celebrations.', 'city' => 'Hyderabad', 'type' => 'hotel', 'capacity' => 400, 'image' => 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'Leonia Holistic Resort', 'description' => 'A sprawling resort with open-air lawns and poolside settings for destination-style weddings.', 'city' => 'Hyderabad', 'type' => 'resort', 'capacity' => 300, 'image' => 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200'],

            // Bengaluru
            ['name' => 'The Leela Palace', 'description' => 'Opulent five-star hotel with a grand ballroom and manicured gardens in the heart of the city.', 'city' => 'Bengaluru', 'type' => 'hotel', 'capacity' => 500, 'image' => 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'Janapriya Township', 'description' => 'Open-air venue with sprawling lawns and a rustic charm for relaxed outdoor celebrations.', 'city' => 'Bengaluru', 'type' => 'farmhouse', 'capacity' => 250, 'image' => 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'Royal Orchid Resort', 'description' => ' lakeside resort with banquet halls and open lawns, ideal for both intimate and grand weddings.', 'city' => 'Bengaluru', 'type' => 'resort', 'capacity' => 350, 'image' => 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200'],

            // Chennai
            ['name' => 'ITC Grand Chola', 'description' => 'Iconic luxury hotel with a magnificent ballroom and South Indian hospitality at its finest.', 'city' => 'Chennai', 'type' => 'hotel', 'capacity' => 600, 'image' => 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'VGP Universal Kingdom', 'description' => 'Beachside venue with open-air settings and ocean breezes for a destination wedding feel.', 'city' => 'Chennai', 'type' => 'beach', 'capacity' => 200, 'image' => 'https://images.pexels.com/photos/169211/pexels-photo-169211.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'The Residency Towers', 'description' => 'Elegant banquet halls in the city centre with modern amenities and traditional charm.', 'city' => 'Chennai', 'type' => 'banquet', 'capacity' => 400, 'image' => 'https://images.pexels.com/photos/24023407/pexels-photo-24023407.jpeg?auto=compress&cs=tinysrgb&w=1200'],

            // Cross-city
            ['name' => 'Park Hyatt', 'description' => 'Contemporary luxury with sophisticated event spaces available across multiple cities.', 'city' => 'Hyderabad', 'type' => 'hotel', 'capacity' => 350, 'image' => 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'The Westin', 'description' => 'Modern hotel with expansive ballrooms and garden areas for stylish celebrations.', 'city' => 'Bengaluru', 'type' => 'hotel', 'capacity' => 450, 'image' => 'https://images.pexels.com/photos/30866709/pexels-photo-30866709.jpeg?auto=compress&cs=tinysrgb&w=1200'],
            ['name' => 'Sage Farm Hotel', 'description' => 'Rustic farmhouse venue surrounded by greenery for intimate garden weddings.', 'city' => 'Chennai', 'type' => 'farmhouse', 'capacity' => 150, 'image' => 'https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg?auto=compress&cs=tinysrgb&w=1200'],
        ];

        foreach ($venues as $venue) {
            Venue::create($venue);
        }
    }
}
