import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from '../models/department.model';
// Import environment but we'll use hardcoded URL for now
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  // Hardcode the Heroku URL to ensure it works regardless of environment
  private apiUrl = 'https://employee-management-backend-ha.herokuapp.com/api/departments';
  
  // Log the API URL being used
  constructor(private http: HttpClient) {
    console.log('DepartmentService using API URL:', this.apiUrl);
  }

  // Constructor moved above

  getAllDepartments(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  getAllDepartmentsWithEmployees(): Observable<Department[]> {
    return this.http.get<Department[]>(`${this.apiUrl}/with-employees`);
  }

  getDepartmentById(id: string): Observable<Department> {
    return this.http.get<Department>(`${this.apiUrl}/${id}`);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, department);
  }

  updateDepartment(id: string, department: Department): Observable<Department> {
    return this.http.put<Department>(`${this.apiUrl}/${id}`, department);
  }

  deleteDepartment(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDepartmentEmployeeCounts(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/employee-counts`);
  }

  getDepartmentSummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/summary`);
  }
}
