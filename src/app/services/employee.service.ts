import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
// Import environment but we'll use hardcoded URL for now
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // Hardcode the Heroku URL to ensure it works regardless of environment
  private apiUrl = 'https://employee-management-backend-ha.herokuapp.com/api/employees';
  
  // Log the API URL being used
  constructor(private http: HttpClient) {
    console.log('EmployeeService using API URL:', this.apiUrl);
  }

  // Constructor moved above

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  getEmployeesByDepartment(departmentId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/department/${departmentId}`);
  }

  // NEW: Check if employee ID exists
  checkEmployeeId(id: string): Observable<{exists: boolean}> {
    return this.http.get<{exists: boolean}>(`${this.apiUrl}/check-id/${id}`);
  }

  // NEW: Get next available employee ID
  getNextEmployeeId(): Observable<{nextId: string}> {
    return this.http.get<{nextId: string}>(`${this.apiUrl}/next-id`);
  }

  addEmployee(employee: Employee, departmentId: string): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiUrl}/department/${departmentId}`, employee);
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getEmployeesGroupedByDepartment(): Observable<Record<string, Employee[]>> {
    return this.http.get<Record<string, Employee[]>>(`${this.apiUrl}/grouped-by-department`);
  }

  getDepartmentSalaryStatistics(): Observable<Record<string, number>> {
    return this.http.get<Record<string, number>>(`${this.apiUrl}/salary-statistics`);
  }
}