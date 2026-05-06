import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LeadService {
  private NG_APP_API_URL = `${environment.NG_APP_API_URL}/api/leads`;

  constructor(private http: HttpClient) {}

  submitLead(data: any): Observable<any> {
    return this.http.post(this.NG_APP_API_URL, data);
  }
}
