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
            'bride_name'  => ['required', 'string', 'max:255'],
            'groom_name'  => ['required', 'string', 'max:255'],
            'email'       => ['required', 'email', 'max:255'],
            'phone'       => ['required', 'string', 'max:20'],
            'community'   => ['nullable', 'string', 'max:100'],
            'city'        => ['nullable', 'string', 'max:100'],
            'wedding_date'=> ['nullable', 'date'],
            'guests'      => ['nullable', 'string', 'max:100'],
            'venue_type'  => ['nullable', 'string', 'max:255'],
            'budget'      => ['nullable', 'integer', 'min:1', 'max:200'],
            'styles'      => ['nullable', 'array'],
            'styles.*'    => ['string', 'max:100'],
            'services'    => ['nullable', 'array'],
            'services.*'  => ['string', 'max:100'],
            'events'      => ['nullable', 'array'],
            'events.*.type'       => ['string', 'max:50'],
            'events.*.name'       => ['string', 'max:100'],
            'events.*.daysBefore' => ['integer'],
            'notes'       => ['nullable', 'string', 'max:2000'],
            'referral'    => ['nullable', 'string', 'max:100'],
        ]);

        $lead = Lead::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Lead received successfully!',
            'data' => $lead,
        ], 201);
    }

    public function index(Request $request): JsonResponse
    {
        $query = Lead::query();

        if ($request->filled('city')) {
            $query->where('city', $request->city);
        }

        if ($request->filled('community')) {
            $query->where('community', $request->community);
        }

        if ($request->filled('from_date')) {
            $query->where('created_at', '>=', $request->from_date);
        }

        if ($request->filled('to_date')) {
            $query->where('created_at', '<=', $request->to_date);
        }

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('bride_name', 'like', "%{$search}%")
                  ->orWhere('groom_name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $leads = $query->orderBy('created_at', 'desc')
                       ->paginate(10);

        return response()->json($leads);
    }
}
