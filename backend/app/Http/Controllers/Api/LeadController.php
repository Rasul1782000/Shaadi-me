<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lead;
use Illuminate\Support\Facades\Validator;

class LeadController extends Controller
{
    /**
     * Store a new lead.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'brideName' => 'required|string|max:255',
            'groomName' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'weddingDate' => 'nullable|string',
            'budget' => 'nullable|string',
            'weddingType' => 'nullable|string',
            'guestCount' => 'nullable|string',
            'planningPreference' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $lead = Lead::create($request->all());

        return response()->json([
            'message' => 'Lead captured successfully',
            'lead' => $lead
        ], 201);
    }
}
