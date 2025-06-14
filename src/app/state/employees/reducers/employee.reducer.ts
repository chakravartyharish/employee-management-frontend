import { createReducer, on } from '@ngrx/store';
import * as EmployeeActions from '../actions/employee.actions';
import { employeeAdapter, initialEmployeeState, EmployeeState } from '../models/employee.state';

export const employeeReducer = createReducer<EmployeeState>(
  initialEmployeeState,
  
  // Load all employees
  on(EmployeeActions.loadEmployees, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EmployeeActions.loadEmployeesSuccess, (state, { employees }) => 
    employeeAdapter.setAll(employees, {
      ...state,
      loading: false
    })
  ),
  
  on(EmployeeActions.loadEmployeesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  // Load individual employee
  on(EmployeeActions.loadEmployee, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EmployeeActions.loadEmployeeSuccess, (state, { employee }) => 
    employeeAdapter.upsertOne(employee, {
      ...state,
      loading: false
    })
  ),
  
  on(EmployeeActions.loadEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  // Create employee
  on(EmployeeActions.createEmployee, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EmployeeActions.createEmployeeSuccess, (state, { employee }) => 
    employeeAdapter.addOne(employee, {
      ...state,
      loading: false
    })
  ),
  
  on(EmployeeActions.createEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  // Update employee
  on(EmployeeActions.updateEmployee, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EmployeeActions.updateEmployeeSuccess, (state, { employee }) => 
    employeeAdapter.updateOne({
      id: employee.id,
      changes: employee
    }, {
      ...state,
      loading: false
    })
  ),
  
  on(EmployeeActions.updateEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  // Delete employee
  on(EmployeeActions.deleteEmployee, state => ({
    ...state,
    loading: true,
    error: null
  })),
  
  on(EmployeeActions.deleteEmployeeSuccess, (state, { id }) => 
    employeeAdapter.removeOne(id, {
      ...state,
      loading: false
    })
  ),
  
  on(EmployeeActions.deleteEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error
  })),
  
  // Select employee
  on(EmployeeActions.selectEmployee, (state, { id }) => ({
    ...state,
    selectedEmployeeId: id
  })),
  
  on(EmployeeActions.clearSelectedEmployee, state => ({
    ...state,
    selectedEmployeeId: null
  }))
);
