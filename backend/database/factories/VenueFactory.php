<?php

namespace Database\Factories;

use App\Models\Venue;
use Illuminate\Database\Eloquent\Factories\Factory;

class VenueFactory extends Factory
{
    protected $model = Venue::class;

    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' ' . fake()->randomElement(['Palace', 'Hotel', 'Resort', 'Lawn', 'Hall', 'Gardens']),
            'description' => fake()->sentence(),
            'city' => fake()->randomElement(['Hyderabad', 'Bengaluru', 'Chennai']),
            'type' => fake()->randomElement(['heritage', 'hotel', 'resort', 'farmhouse', 'beach', 'banquet']),
            'capacity' => fake()->numberBetween(100, 1000),
            'image' => fake()->imageUrl(),
        ];
    }

    public function inCity(string $city): static
    {
        return $this->state(fn () => ['city' => $city]);
    }

    public function ofType(string $type): static
    {
        return $this->state(fn () => ['type' => $type]);
    }
}
