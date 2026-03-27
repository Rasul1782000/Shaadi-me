<?php

namespace App\Modules\Contact\Controllers;

use App\Http\Controllers\Controller;
use App\Modules\Contact\Requests\StoreContactRequest;
use App\Modules\Contact\Models\Contact;
use App\Modules\Contact\Services\ContactService;

class ContactController extends Controller
{
    protected $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function store(StoreContactRequest $request)
    {
        $contact = $this->contactService->createContact($request->validated());
        
        return response()->json([
            'message' => 'Message sent successfully',
            'contact' => $contact
        ], 201);
    }

    public function delete($id)
    {
        $result = $this->contactService->deleteContact($id);
        
        if (!$result) {
            return response()->json([
                'message' => 'Message not found'
            ], 404);
        }

        return response()->json([
            'message' => 'Message deleted successfully'
        ], 200);
    }

    public function checkcontactlist($id)
    {
        $contact = $this->contactService->getContactByUserId($id);

        if ($contact) {
            return response()->json([
                'message' => 'Contact already exists',
                'contact' => $contact
            ], 200);
        } else {
            return response()->json([
                'message' => 'Contact not found'
            ], 404);
        }
    }

    public function view($id)
    {
        $contacts = $this->contactService->getAllContactsByUserId($id);

        if ($contacts->isNotEmpty()) {
            return response()->json([
                'message' => 'Contact found',
                'contact' => $contacts
            ], 200);
        } else {
            return response()->json([
                'message' => 'Contact not found'
            ], 404);
        }
    }
}