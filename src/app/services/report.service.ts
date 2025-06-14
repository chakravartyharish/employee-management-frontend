import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Import environment but we'll use hardcoded URL for now
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  // Hardcode the Heroku URL to ensure it works regardless of environment
  private apiUrl = 'https://employee-management-backend-ha.herokuapp.com/api/reports';
  
  // Log the API URL being used
  constructor(private http: HttpClient) {
    console.log('ReportService using API URL:', this.apiUrl);
  }

  // Constructor moved above

  generateEmployeeReport(): string {
    // Return the URL that will be used to open the PDF in a new tab
    return `${this.apiUrl}/employee-pdf`;
  }

  generateEmployeeReportInline(): string {
    // Return the URL for inline viewing
    return `${this.apiUrl}/employee-pdf-inline`;
  }

  // Health check for report service
  checkReportServiceHealth(): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/health`);
  }
}
