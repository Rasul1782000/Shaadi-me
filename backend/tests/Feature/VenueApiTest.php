<?php

namespace Tests\Feature;

use App\Models\Venue;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VenueApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_lists_venues_paginated(): void
    {
        Venue::factory()->count(15)->create();

        $response = $this->getJson('/api/venues');

        $response
            ->assertOk()
            ->assertJsonStructure([
                'data',
                'current_page',
                'last_page',
                'per_page',
                'total',
            ])
            ->assertJsonPath('per_page', 10)
            ->assertJsonPath('total', 15);
    }

    public function test_it_filters_venues_by_city(): void
    {
        Venue::factory()->count(3)->inCity('Hyderabad')->create();
        Venue::factory()->count(2)->inCity('Bengaluru')->create();

        $response = $this->getJson('/api/venues?city=Hyderabad');

        $response
            ->assertOk()
            ->assertJsonPath('total', 3);
    }

    public function test_it_filters_venues_by_type(): void
    {
        Venue::factory()->count(2)->ofType('heritage')->create();
        Venue::factory()->count(4)->ofType('hotel')->create();

        $response = $this->getJson('/api/venues?type=hotel');

        $response
            ->assertOk()
            ->assertJsonPath('total', 4);
    }

    public function test_it_searches_venues_by_name(): void
    {
        Venue::factory()->create(['name' => 'Taj Mahal Palace']);
        Venue::factory()->count(3)->create();

        $response = $this->getJson('/api/venues?search=Taj');

        $response
            ->assertOk()
            ->assertJsonPath('total', 1);
    }

    public function test_it_searches_venues_by_description(): void
    {
        Venue::factory()->create(['description' => 'A beautiful beachfront property with ocean views.']);
        Venue::factory()->count(3)->create();

        $response = $this->getJson('/api/venues?search=beachfront');

        $response
            ->assertOk()
            ->assertJsonPath('total', 1);
    }

    public function test_it_returns_venues_alphabetically_ordered(): void
    {
        Venue::factory()->create(['name' => 'Zebra Resort']);
        Venue::factory()->create(['name' => 'Alpha Gardens']);

        $response = $this->getJson('/api/venues');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.name', 'Alpha Gardens')
            ->assertJsonPath('data.1.name', 'Zebra Resort');
    }

    public function test_it_combines_city_and_type_filters(): void
    {
        Venue::factory()->create(['city' => 'Hyderabad', 'type' => 'heritage']);
        Venue::factory()->create(['city' => 'Hyderabad', 'type' => 'hotel']);
        Venue::factory()->create(['city' => 'Bengaluru', 'type' => 'heritage']);

        $response = $this->getJson('/api/venues?city=Hyderabad&type=heritage');

        $response
            ->assertOk()
            ->assertJsonPath('total', 1);
    }
}
