<?php

namespace App\Modules\Lead\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreLeadRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'brideName' => 'required|string|max:255',
            'groomName' => 'required|string|max:255',
            'phone' => 'required|string|max:20|regex:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/',
            'city' => 'required|string|max:255',
            'date' => 'nullable|date',
            'budget' => 'nullable|string|max:100',
            'type' => 'nullable|string|max:100',
            'guests' => 'nullable|numeric|min:1|max:10000',
            'preference' => 'nullable|string|max:100',
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'brideName.required' => 'Bride name is required',
            'groomName.required' => 'Groom name is required',
            'phone.required' => 'Phone number is required',
            'phone.regex' => 'Please enter a valid phone number',
            'city.required' => 'City is required',
            'date.date' => 'Please enter a valid date',
            'guests.numeric' => 'Guest count must be a number',
            'guests.min' => 'Guest count must be at least 1',
            'guests.max' => 'Guest count cannot exceed 10,000',
        ];
    }
}