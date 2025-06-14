import { Component, OnInit } from '@angular/core';
import { Department } from '../../models/department.model';
import { DepartmentService } from '../../services/department.service';

@Component({
  selector: 'app-department-list',
  template: `
    <div class="container mt-4">
      <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
          <h5 class="mb-0">
            <i class="fas fa-building me-2"></i>
            Departments
          </h5>
          <button class="btn btn-sm btn-success" (click)="openDepartmentForm()">
            <i class="fas fa-plus me-1"></i> Add Department
          </button>
        </div>
        <div class="card-body">
          <div *ngIf="loading" class="text-center py-3">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <p class="mt-2">Loading departments...</p>
          </div>
          
          <div *ngIf="!loading">
            <div class="table-responsive">
              <table class="table table-hover">
                <thead class="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Location</th>
                    <th>Employees</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let dept of departments">
                    <td>{{ dept.id }}</td>
                    <td>{{ dept.name }}</td>
                    <td>{{ dept.location }}</td>
                    <td>{{ dept.employees?.length || 0 }}</td>
                    <td>
                      <button class="btn btn-sm btn-outline-primary me-1" (click)="editDepartment(dept)">
                        <i class="fas fa-edit"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger" (click)="deleteDepartment(dept)">
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div *ngIf="departments.length === 0" class="alert alert-info text-center">
              <i class="fas fa-info-circle me-2"></i>
              No departments found.
            </div>
          </div>
        </div>
      </div>
      
      <!-- Department Form Modal -->
      <div class="modal fade show d-block" *ngIf="showDepartmentForm" style="background-color: rgba(0,0,0,0.5);">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">
                <i class="fas fa-building me-2"></i>
                {{ isEditMode ? 'Edit Department' : 'Add Department' }}
              </h5>
              <button type="button" class="btn-close" (click)="closeDepartmentForm()"></button>
            </div>
            <div class="modal-body">
              <form #departmentForm="ngForm">
                <div class="mb-3" *ngIf="isEditMode">
                  <label class="form-label">ID:</label>
                  <input type="text" class="form-control" [(ngModel)]="currentDepartment.id" name="id" readonly>
                </div>
                <div class="mb-3">
                  <label class="form-label">Name: <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" [(ngModel)]="currentDepartment.name" name="name" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Location: <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" [(ngModel)]="currentDepartment.location" name="location" required>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" (click)="closeDepartmentForm()">
                <i class="fas fa-times me-1"></i> Cancel
              </button>
              <button type="button" class="btn btn-primary" (click)="saveDepartment()" [disabled]="!departmentForm.form.valid">
                <i class="fas fa-save me-1"></i> Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .table th, .table td {
      vertical-align: middle;
    }
  `]
})
export class DepartmentListComponent implements OnInit {
  departments: Department[] = [];
  currentDepartment: Department = { id: '', name: '', location: '' };
  showDepartmentForm = false;
  isEditMode = false;
  loading = false;

  constructor(private departmentService: DepartmentService) { }

  ngOnInit(): void {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.loading = true;
    this.departmentService.getAllDepartmentsWithEmployees().subscribe({
      next: (data) => {
        this.departments = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading departments', err);
        this.loading = false;
        alert('Error loading departments');
      }
    });
  }

  openDepartmentForm(): void {
    this.isEditMode = false;
    this.currentDepartment = { id: '', name: '', location: '' };
    this.showDepartmentForm = true;
  }

  editDepartment(department: Department): void {
    this.isEditMode = true;
    this.currentDepartment = { ...department };
    this.showDepartmentForm = true;
  }

  closeDepartmentForm(): void {
    this.showDepartmentForm = false;
  }

  saveDepartment(): void {
    if (this.isEditMode) {
      this.departmentService.updateDepartment(this.currentDepartment.id, this.currentDepartment).subscribe({
        next: () => {
          this.loadDepartments();
          this.closeDepartmentForm();
          alert('Department updated successfully');
        },
        error: (err) => {
          console.error('Error updating department', err);
          alert('Error updating department');
        }
      });
    } else {
      this.departmentService.createDepartment(this.currentDepartment).subscribe({
        next: () => {
          this.loadDepartments();
          this.closeDepartmentForm();
          alert('Department added successfully');
        },
        error: (err) => {
          console.error('Error adding department', err);
          alert('Error adding department');
        }
      });
    }
  }

  deleteDepartment(department: Department): void {
    if (confirm(`Are you sure you want to delete department "${department.name}"?`)) {
      this.departmentService.deleteDepartment(department.id).subscribe({
        next: () => {
          this.loadDepartments();
          alert('Department deleted successfully');
        },
        error: (err) => {
          console.error('Error deleting department', err);
          alert('Error deleting department. Make sure there are no employees in this department.');
        }
      });
    }
  }
}
