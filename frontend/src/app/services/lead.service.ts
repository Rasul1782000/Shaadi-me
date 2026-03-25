import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private apiUrl = '/api/leads';

  constructor(private http: HttpClient) {}

  submitLead(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }
}
