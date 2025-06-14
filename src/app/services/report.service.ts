import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) { }

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
