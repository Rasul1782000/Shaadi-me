<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_lead(): void
    {
        $response = $this->postJson('/api/leads', [
            'brideName' => 'Aisha',
            'groomName' => 'Rahul',
            'phone' => '9999999999',
            'date' => '2026-12-10',
            'budget' => '15 to 30 Lakh',
            'type' => 'Love Marriage',
            'guests' => '300 to 600',
            'preference' => 'I want to share my vision and let ShaadiMe handle the rest',
            'city' => 'Bengaluru',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.bride_name', 'Aisha')
            ->assertJsonPath('data.groom_name', 'Rahul');

        $this->assertDatabaseHas('leads', [
            'bride_name' => 'Aisha',
            'groom_name' => 'Rahul',
            'phone' => '9999999999',
        ]);
    }

    public function test_it_lists_venues(): void
    {
        $this->getJson('/api/venues')
            ->assertOk()
            ->assertJsonCount(3)
            ->assertJsonPath('0.name', 'Palace & Heritage');
    }
}
