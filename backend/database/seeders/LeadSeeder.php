<?php

namespace Database\Seeders;

use App\Models\Lead;
use Illuminate\Database\Seeder;

class LeadSeeder extends Seeder
{
    public function run(): void
    {
        Lead::create([
            'bride_name' => 'Aisha',
            'groom_name' => 'Rahul',
            'email' => 'aisha@example.com',
            'phone' => '9999999999',
            'community' => 'Punjabi',
            'city' => 'Bengaluru',
            'wedding_date' => '2026-12-10',
            'guests' => '300 to 600',
            'venue_type' => 'Love Marriage',
            'budget' => 25,
            'styles' => ['Royal Grandeur', 'Floral Extravaganza'],
            'services' => ['Venue', 'Photography', 'Catering', 'Music & DJ'],
            'events' => [
                ['type' => 'engagement', 'name' => 'Engagement', 'daysBefore' => -30],
                ['type' => 'mehendi', 'name' => 'Mehendi', 'daysBefore' => -2],
                ['type' => 'sangeet', 'name' => 'Sangeet', 'daysBefore' => -1],
                ['type' => 'wedding', 'name' => 'Wedding', 'daysBefore' => 0],
                ['type' => 'reception', 'name' => 'Reception', 'daysBefore' => 1],
            ],
            'notes' => 'Looking for a grand destination wedding.',
            'referral' => 'Instagram',
        ]);

        Lead::create([
            'bride_name' => 'Priya',
            'groom_name' => 'Arjun',
            'email' => 'priya@example.com',
            'phone' => '8888888888',
            'community' => 'Telugu',
            'city' => 'Hyderabad',
            'wedding_date' => '2027-02-14',
            'guests' => '500 to 1000',
            'venue_type' => 'Farmhouse or open lawn',
            'budget' => 60,
            'styles' => ['Traditional South Indian'],
            'services' => ['Venue', 'Decoration & Florals', 'Catering', 'Bridal Makeup', 'Music & DJ'],
            'events' => [
                ['type' => 'engagement', 'name' => 'Nichayathartham', 'daysBefore' => -30],
                ['type' => 'mehendi', 'name' => 'Mehendi', 'daysBefore' => -2],
                ['type' => 'wedding', 'name' => 'Wedding', 'daysBefore' => 0],
                ['type' => 'reception', 'name' => 'Reception', 'daysBefore' => 1],
            ],
            'notes' => null,
            'referral' => 'Google search',
        ]);

        Lead::create([
            'bride_name' => 'Sneha',
            'groom_name' => 'Vikram',
            'email' => 'sneha@email.com',
            'phone' => '7777777777',
            'community' => 'Tamil',
            'city' => 'Chennai',
            'wedding_date' => '2026-09-20',
            'guests' => '150 to 300',
            'venue_type' => 'Five star hotel',
            'budget' => 40,
            'styles' => ['Minimalist Modern', 'Intimate Garden'],
            'services' => ['Venue', 'Photography', 'Videography'],
            'events' => [
                ['type' => 'engagement', 'name' => 'Nichayathartham', 'daysBefore' => -30],
                ['type' => 'wedding', 'name' => 'Wedding', 'daysBefore' => 0],
                ['type' => 'reception', 'name' => 'Reception', 'daysBefore' => 1],
            ],
            'notes' => 'Prefer a venue with outdoor space.',
            'referral' => 'Friend or family',
        ]);
    }
}
