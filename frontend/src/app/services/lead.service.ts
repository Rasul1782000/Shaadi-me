import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LeadPayload {
  bride_name: string;
  groom_name: string;
  email: string;
  phone: string;
  community?: string;
  city?: string;
  wedding_date?: string;
  guests?: string;
  venue_type?: string;
  budget?: number;
  styles?: string[];
  services?: string[];
  events?: { type: string; name: string; daysBefore: number }[];
  notes?: string;
  referral?: string;
}

export interface Lead {
  id: number;
  bride_name: string;
  groom_name: string;
  email: string;
  phone: string;
  community: string | null;
  city: string | null;
  wedding_date: string | null;
  guests: string | null;
  venue_type: string | null;
  budget: number | null;
  styles: string[] | null;
  services: string[] | null;
  events: { type: string; name: string; daysBefore: number }[] | null;
  notes: string | null;
  referral: string | null;
  created_at: string;
  updated_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = '/api/leads';

  constructor(private http: HttpClient) {}

  submitLead(data: LeadPayload): Observable<ApiResponse<Lead>> {
    return this.http.post<ApiResponse<Lead>>(this.apiUrl, data);
  }

  getLeads(params?: {
    page?: number;
    city?: string;
    community?: string;
    from_date?: string;
    to_date?: string;
    search?: string;
  }): Observable<{
    data: Lead[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  }> {
    return this.http.get<any>(this.apiUrl, { params });
  }
}
