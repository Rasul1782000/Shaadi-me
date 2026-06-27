<?php

namespace Tests\Feature;

use App\Models\Lead;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LeadApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_creates_a_lead_with_minimal_fields(): void
    {
        $response = $this->postJson('/api/leads', [
            'bride_name' => 'Aisha',
            'groom_name' => 'Rahul',
            'email' => 'aisha@example.com',
            'phone' => '9999999999',
        ]);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('message', 'Lead received successfully!')
            ->assertJsonPath('data.bride_name', 'Aisha')
            ->assertJsonPath('data.groom_name', 'Rahul')
            ->assertJsonPath('data.email', 'aisha@example.com')
            ->assertJsonPath('data.phone', '9999999999');

        $this->assertDatabaseHas('leads', [
            'bride_name' => 'Aisha',
            'groom_name' => 'Rahul',
            'email' => 'aisha@example.com',
        ]);
    }

    public function test_it_creates_a_lead_with_all_fields(): void
    {
        $payload = [
            'bride_name' => 'Priya',
            'groom_name' => 'Arjun',
            'email' => 'priya@example.com',
            'phone' => '8888888888',
            'community' => 'Telugu',
            'city' => 'Hyderabad',
            'wedding_date' => '2027-02-14',
            'guests' => '300 to 500',
            'venue_type' => 'Farmhouse or open lawn',
            'budget' => 75,
            'styles' => ['Traditional South Indian', 'Floral Extravaganza'],
            'services' => ['Venue', 'Catering', 'Music & DJ'],
            'events' => [
                ['type' => 'engagement', 'name' => 'Engagement', 'daysBefore' => -30],
                ['type' => 'wedding', 'name' => 'Wedding', 'daysBefore' => 0],
            ],
            'notes' => 'Looking for eco-friendly decor.',
            'referral' => 'Google search',
        ];

        $response = $this->postJson('/api/leads', $payload);

        $response
            ->assertCreated()
            ->assertJsonPath('success', true)
            ->assertJsonPath('data.bride_name', 'Priya')
            ->assertJsonPath('data.groom_name', 'Arjun')
            ->assertJsonPath('data.community', 'Telugu')
            ->assertJsonPath('data.city', 'Hyderabad')
            ->assertJsonPath('data.budget', 75);

        $this->assertDatabaseHas('leads', [
            'bride_name' => 'Priya',
            'email' => 'priya@example.com',
        ]);
    }

    public function test_it_validates_required_fields(): void
    {
        $response = $this->postJson('/api/leads', []);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['bride_name', 'groom_name', 'email', 'phone']);
    }

    public function test_it_validates_email_format(): void
    {
        $response = $this->postJson('/api/leads', [
            'bride_name' => 'Test',
            'groom_name' => 'Test',
            'email' => 'not-an-email',
            'phone' => '1234567890',
        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_it_lists_leads_paginated(): void
    {
        Lead::factory()->count(15)->create();

        $response = $this->getJson('/api/leads');

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

    public function test_it_filters_leads_by_city(): void
    {
        Lead::factory()->count(3)->fromCity('Bengaluru')->create();
        Lead::factory()->count(2)->fromCity('Hyderabad')->create();

        $response = $this->getJson('/api/leads?city=Bengaluru');

        $response
            ->assertOk()
            ->assertJsonPath('total', 3);
    }

    public function test_it_filters_leads_by_community(): void
    {
        Lead::factory()->count(2)->withCommunity('Punjabi')->create();
        Lead::factory()->count(3)->withCommunity('Telugu')->create();

        $response = $this->getJson('/api/leads?community=Telugu');

        $response
            ->assertOk()
            ->assertJsonPath('total', 3);
    }

    public function test_it_searches_leads_by_name(): void
    {
        Lead::factory()->create(['bride_name' => 'Lakshmi']);
        Lead::factory()->create(['bride_name' => 'Lata']);
        Lead::factory()->count(3)->create();

        $response = $this->getJson('/api/leads?search=Lak');

        $response
            ->assertOk()
            ->assertJsonPath('total', 1);
    }

    public function test_it_searches_leads_by_email(): void
    {
        Lead::factory()->create(['email' => 'unique@example.com']);
        Lead::factory()->count(3)->create();

        $response = $this->getJson('/api/leads?search=unique');

        $response
            ->assertOk()
            ->assertJsonPath('total', 1);
    }

    public function test_it_filters_leads_by_date_range(): void
    {
        Lead::factory()->create(['created_at' => '2026-01-15 10:00:00']);
        Lead::factory()->create(['created_at' => '2026-02-20 10:00:00']);
        Lead::factory()->create(['created_at' => '2026-03-10 10:00:00']);

        $response = $this->getJson('/api/leads?from_date=2026-02-01&to_date=2026-03-01');

        $response
            ->assertOk()
            ->assertJsonPath('total', 1);
    }

    public function test_it_returns_leads_in_reverse_chronological_order(): void
    {
        Lead::factory()->create(['bride_name' => 'Old', 'created_at' => '2026-01-01 10:00:00']);
        Lead::factory()->create(['bride_name' => 'New', 'created_at' => '2026-06-01 10:00:00']);

        $response = $this->getJson('/api/leads');

        $response
            ->assertOk()
            ->assertJsonPath('data.0.bride_name', 'New')
            ->assertJsonPath('data.1.bride_name', 'Old');
    }
}
