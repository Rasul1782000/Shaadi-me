<?php

namespace App\Modules\Lead\Services;

use App\Modules\Lead\Models\Lead;

class LeadService
{
    public function createLead(array $data): Lead
    {
        $mappedData = $this->mapLeadData($data);
        return Lead::create($mappedData);
    }

    public function getAllLeads()
    {
        return Lead::all();
    }

    public function getLeadById(int $id): ?Lead
    {
        return Lead::find($id);
    }

    public function deleteLead(int $id): bool
    {
        $lead = Lead::find($id);
        
        if (!$lead) {
            return false;
        }
        
        $lead->delete();
        return true;
    }

    /**
     * Map frontend data to database format.
     */
    private function mapLeadData(array $data): array
    {
        return [
            'bride_name' => $data['brideName'] ?? null,
            'groom_name' => $data['groomName'] ?? null,
            'phone' => $data['phone'] ?? null,
            'wedding_date' => $data['date'] ?? null,
            'budget' => $data['budget'] ?? null,
            'wedding_type' => $data['type'] ?? null,
            'guest_count' => $data['guests'] ?? null,
            'planning_preference' => $data['preference'] ?? null,
            'city' => $data['city'] ?? null,
        ];
    }
}
