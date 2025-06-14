import { Component, OnInit, OnDestroy } from '@angular/core';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { ReportService } from '../../services/report.service';

// NgRx imports
import { Store } from '@ngrx/store';
import { AppState } from '../../state';
import * as EmployeeActions from '../../state/employees/actions/employee.actions';
import * as EmployeeSelectors from '../../state/employees/selectors/employee.selectors';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  title = 'Employee Management System';
  employees: Employee[] = [];
  departments: Department[] = [];
  departmentId: string = '';
  selectedEmployee: Employee | null = null;
  isEditing: boolean = false;
  isAddingNew: boolean = false;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  alertMessage: string = '';
  alertType: string = '';
  showAlert: boolean = false;

  private subscriptions: Subscription = new Subscription();
  
  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private reportService: ReportService,
    private store: Store<AppState>
  ) {
    this.loading$ = this.store.select(EmployeeSelectors.selectEmployeeLoading);
    this.error$ = this.store.select(EmployeeSelectors.selectEmployeeError);
  }

  ngOnInit() {
    this.loadDepartments();
    
    // Subscribe to the employees from the store
    this.subscriptions.add(
      this.store.select(EmployeeSelectors.selectAllEmployees).subscribe(employees => {
        this.employees = employees;
      })
    );
    
    // Subscribe to error state to show alerts
    this.subscriptions.add(
      this.error$.subscribe(error => {
        if (error) {
          this.displayAlert(error, 'danger');
        }
      })
    );
  }
  
  ngOnDestroy() {
    // Clean up subscriptions when the component is destroyed
    this.subscriptions.unsubscribe();
  }

  loadDepartments() {
    // We don't use NgRx for departments yet, so using the service directly
    this.departmentService.getAllDepartments().subscribe({
      next: (departments) => {
        this.departments = departments;
      },
      error: (error) => {
        console.error('Error loading departments:', error);
        this.displayAlert('Error loading departments', 'danger');
      }
    });
  }

  searchEmployees() {
    if (!this.departmentId.trim()) {
      this.displayAlert('Please select a department', 'warning');
      return;
    }

    // Use NgRx to load employees
    this.store.dispatch(EmployeeActions.loadEmployees());
    
    // We'll still need to filter by department, but our effect will handle the API call
    // The subscriptions we set up in ngOnInit will update the component state
  }

  editEmployee(employee: Employee) {
    this.selectedEmployee = { ...employee };
    this.isEditing = true;
    this.isAddingNew = false;
  }

  addNewEmployee() {
    if (!this.departmentId.trim()) {
      this.displayAlert('Please select a department first', 'warning');
      return;
    }
    
    // Get next available employee ID
    this.employeeService.getNextEmployeeId().subscribe({
      next: (response) => {
        this.selectedEmployee = {
          id: response.nextId,
          name: '',
          email: '',
          position: '',
          salary: 0,
          departmentId: this.departmentId
        };
        this.isAddingNew = true;
        this.isEditing = false;
      },
      error: (error) => {
        console.error('Error getting next employee ID:', error);
        this.displayAlert('Error getting next employee ID', 'danger');
      }
    });
  }

  closeEmployeeForm() {
    this.selectedEmployee = null;
    this.isEditing = false;
    this.isAddingNew = false;
  }

  saveEmployee() {
    if (!this.selectedEmployee || !this.validateEmployee()) {
      return;
    }

    // Use NgRx to update the employee
    this.store.dispatch(EmployeeActions.updateEmployee({ employee: this.selectedEmployee }));
    
    // Since we're now using NgRx, we need to subscribe to the store
    // to know when the update is complete
    const updateSubscription = this.error$.subscribe(error => {
      if (!error) {
        // If there's no error, it means the update was successful
        this.isEditing = false;
        this.displayAlert('Employee updated successfully!', 'success');
        this.closeEmployeeForm();
        updateSubscription.unsubscribe();
      } else {
        // Error handling is already done via our error$ subscription
        updateSubscription.unsubscribe();
      }
    });
  }

  deleteEmployee() {
    if (!this.selectedEmployee) return;

    if (confirm('Are you sure you want to delete this employee?')) {
      // Use NgRx to delete the employee
      this.store.dispatch(EmployeeActions.deleteEmployee({ id: this.selectedEmployee.id }));
      
      // Since we're now using NgRx, we need to subscribe to the store
      // to know when the deletion is complete
      const deleteSubscription = this.error$.subscribe(error => {
        if (!error) {
          // If there's no error, it means the deletion was successful
          this.closeEmployeeForm();
          this.displayAlert('Employee deleted successfully!', 'success');
          deleteSubscription.unsubscribe();
        } else {
          // Error handling is already done via our error$ subscription
          deleteSubscription.unsubscribe();
        }
      });
    }
  }

  saveNewEmployee() {
    if (!this.selectedEmployee || !this.validateEmployee()) {
      return;
    }

    // Check if ID already exists (additional client-side validation)
    this.employeeService.checkEmployeeId(this.selectedEmployee.id).subscribe({
      next: (response) => {
        if (response.exists) {
          this.displayAlert('Employee ID already exists. Please use a different ID', 'warning');
          return;
        }

        // Proceed with adding employee
        this.proceedWithAddEmployee();
      },
      error: (error) => {
        console.error('Error checking employee ID:', error);
        // Proceed anyway, let backend handle the validation
        this.proceedWithAddEmployee();
      }
    });
  }

  private proceedWithAddEmployee() {
    if (!this.selectedEmployee) return;

    console.log('Adding employee with department ID:', this.departmentId);
    console.log('Employee data:', this.selectedEmployee);
    
    // Use NgRx to create the employee
    this.store.dispatch(EmployeeActions.createEmployee({ employee: this.selectedEmployee }));
    
    // Since we're now using NgRx, we need to subscribe to the store
    // to know when the creation is complete
    const createSubscription = this.error$.subscribe(error => {
      if (!error) {
        // If there's no error, it means the creation was successful
        this.closeEmployeeForm();
        this.displayAlert('Employee added successfully!', 'success');
        // Refresh the employee list
        this.searchEmployees();
        createSubscription.unsubscribe();
      } else {
        // Error handling is already done via our error$ subscription
        createSubscription.unsubscribe();
      }
    });
  }

  private handleEmployeeError(error: any, defaultMessage: string) {
    let errorMessage = defaultMessage;
    
    if (error.error && error.error.error) {
      // Backend returned structured error response
      errorMessage = error.error.error;
    } else if (error.error && typeof error.error === 'string') {
      errorMessage = error.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    this.displayAlert(errorMessage, 'danger');
  }

  generateReport() {
    window.open(this.reportService.generateEmployeeReport(), '_blank');
  }

  private validateEmployee(): boolean {
    if (!this.selectedEmployee) return false;
    
    if (!this.selectedEmployee.id || !this.selectedEmployee.id.trim()) {
      this.displayAlert('Employee ID is required', 'warning');
      return false;
    }
    
    if (!this.selectedEmployee.name.trim()) {
      this.displayAlert('Name is required', 'warning');
      return false;
    }
    
    if (!this.selectedEmployee.email.trim()) {
      this.displayAlert('Email is required', 'warning');
      return false;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.selectedEmployee.email)) {
      this.displayAlert('Please enter a valid email address', 'warning');
      return false;
    }
    
    if (!this.selectedEmployee.position.trim()) {
      this.displayAlert('Position is required', 'warning');
      return false;
    }
    
    if (this.selectedEmployee.salary <= 0) {
      this.displayAlert('Salary must be greater than 0', 'warning');
      return false;
    }
    
    return true;
  }

  displayAlert(message: string, type: string) {
    this.alertMessage = message;
    this.alertType = type;
    this.showAlert = true;
    
    // Auto-hide alert after 5 seconds for better visibility
    setTimeout(() => {
      this.showAlert = false;
    }, 5000);
  }
}