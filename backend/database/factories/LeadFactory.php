<?php

namespace Database\Factories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $statuses = ['new', 'contacted', 'qualified', 'converted', 'lost'];
        
        return [
            'bride_name' => fake()->firstNameFemale() . ' ' . fake()->lastName(),
            'groom_name' => fake()->firstNameMale() . ' ' . fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'phone' => fake()->phoneNumber(),
            'community' => fake()->randomElement(['Hindu', 'Muslim', 'Sikh', 'Christian', 'Other']),
            'wedding_date' => fake()->dateTimeBetween('+1 month', '+1 year')->format('Y-m-d'),
            'guests' => fake()->numberBetween(50, 1000),
            'venue_type' => fake()->randomElement(['Palace & Heritage', 'Five Star Hotel', 'Beach Resort', 'Farmhouse', 'Banquet Hall']),
            'city' => fake()->city(),
            'budget' => fake()->numberBetween(500000, 5000000),
            'styles' => json_encode([fake()->randomElement(['Traditional', 'Modern', 'Minimalist', 'Royal', 'Bohemian'])]),
            'services' => json_encode([fake()->randomElement(['Catering', 'Photography', 'Decor', 'Makeup', 'Entertainment'])]),
            'events' => json_encode([fake()->randomElement(['Sangeet', 'Haldi', 'Wedding', 'Reception', 'Mehendi'])]),
            'status' => fake()->randomElement($statuses),
            'notes' => fake()->optional()->sentence(),
            'referral' => fake()->randomElement(['Instagram', 'Facebook', 'Google', 'Friend', 'Other']),
            'created_at' => fake()->dateTimeBetween('-3 months', 'now'),
            'updated_at' => now(),
        ];
    }
}
