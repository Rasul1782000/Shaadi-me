<?php

namespace App\Modules\Lead\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Lead\Requests\StoreLeadRequest;
use App\Modules\Lead\Requests\LeadRequest;
use App\Modules\Lead\Services\LeadService;

class LeadController extends Controller
{
    protected $leadService;

    public function __construct(LeadService $leadService)
    {
        $this->leadService = $leadService;
    }

    public function store(StoreLeadRequest $request)
    {
        $lead = $this->leadService->createLead($request->validated());

        return response()->json([
            'message' => 'Lead captured successfully',
            'lead' => $lead
        ], 201);
    }

    public function create(LeadRequest $request)
    {
        $lead = $this->leadService->createLead($request->validated());

        return response()->json([
            'message' => 'Lead captured successfully',
            'lead' => $lead
        ], 201);
    }

    public function index()
    {
        $leads = $this->leadService->getAllLeads();
        
        return response()->json([
            'message' => 'Leads retrieved successfully',
            'leads' => $leads
        ], 200);
    }

    public function show($id)
    {
        $lead = $this->leadService->getLeadById($id);
        
        if (!$lead) {
            return response()->json([
                'message' => 'Lead not found'
            ], 404);
        }
        
        return response()->json([
            'message' => 'Lead retrieved successfully',
            'lead' => $lead
        ], 200);
    }

    public function delete($id)
    {
        $result = $this->leadService->deleteLead($id);
        
        if (!$result) {
            return response()->json([
                'message' => 'Lead not found'
            ], 404);
        }
        
        return response()->json([
            'message' => 'Lead deleted successfully'
        ], 200);
    }
}
