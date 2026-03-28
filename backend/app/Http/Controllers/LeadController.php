<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Modules\Lead\Models\Lead;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'brideName' => ['required', 'string', 'max:255'],
            'groomName' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'date' => ['nullable', 'string', 'max:255'],
            'budget' => ['nullable', 'string', 'max:255'],
            'type' => ['nullable', 'string', 'max:255'],
            'guests' => ['nullable', 'string', 'max:255'],
            'preference' => ['nullable', 'string'],
            'city' => ['nullable', 'string', 'max:255'],
        ]);

        $lead = Lead::create([
            'bride_name' => $validated['brideName'],
            'groom_name' => $validated['groomName'],
            'phone' => $validated['phone'],
            'wedding_date' => $validated['date'] ?? null,
            'budget' => $validated['budget'] ?? null,
            'wedding_type' => $validated['type'] ?? null,
            'guest_count' => $validated['guests'] ?? null,
            'planning_preference' => $validated['preference'] ?? null,
            'city' => $validated['city'] ?? null,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Lead received successfully!',
            'data' => $lead,
        ], 201);
    }
}
