import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = `${environment.apiUrl}/api/employees`;

  constructor(private http: HttpClient) { }

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