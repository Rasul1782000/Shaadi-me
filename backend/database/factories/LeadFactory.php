<?php

namespace Database\Factories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

class LeadFactory extends Factory
{
    protected $model = Lead::class;

    public function definition(): array
    {
        return [
            'bride_name' => fake()->firstName(),
            'groom_name' => fake()->firstName(),
            'email' => fake()->safeEmail(),
            'phone' => fake()->numerify('##########'),
            'community' => fake()->randomElement(['Punjabi', 'Telugu', 'Tamil', 'Marathi', 'Gujarati', 'Bengali', 'Other']),
            'city' => fake()->randomElement(['Bengaluru', 'Hyderabad', 'Chennai', 'Mumbai', 'Delhi']),
            'wedding_date' => fake()->date('Y-m-d', '+1 year'),
            'guests' => fake()->randomElement(['50 – 150', '150 – 300', '300 – 500', '500 – 1000']),
            'venue_type' => fake()->randomElement(['Palace or heritage property', 'Five star hotel', 'Farmhouse or open lawn', 'Banquet hall']),
            'budget' => fake()->numberBetween(10, 150),
            'styles' => fake()->randomElements(['Royal Grandeur', 'Intimate Garden', 'Traditional South Indian', 'Minimalist Modern', 'Floral Extravaganza', 'Destination'], fake()->numberBetween(1, 3)),
            'services' => fake()->randomElements(['Venue', 'Photography', 'Videography', 'Decoration & Florals', 'Catering', 'Music & DJ'], fake()->numberBetween(2, 5)),
            'events' => [
                ['type' => 'engagement', 'name' => 'Engagement', 'daysBefore' => -30],
                ['type' => 'wedding', 'name' => 'Wedding', 'daysBefore' => 0],
                ['type' => 'reception', 'name' => 'Reception', 'daysBefore' => 1],
            ],
            'notes' => fake()->optional()->sentence(),
            'referral' => fake()->randomElement(['Instagram', 'Google search', 'Friend or family', 'Shaadi.com']),
        ];
    }

    public function fromCity(string $city): static
    {
        return $this->state(fn () => ['city' => $city]);
    }

    public function withCommunity(string $community): static
    {
        return $this->state(fn () => ['community' => $community]);
    }
}
