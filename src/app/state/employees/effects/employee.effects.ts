import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { EmployeeService } from '../../../services/employee.service';
import * as EmployeeActions from '../actions/employee.actions';

@Injectable()
export class EmployeeEffects {
  loadEmployees$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeActions.loadEmployees),
    switchMap(() => this.employeeService.getAllEmployees()
      .pipe(
        map(employees => EmployeeActions.loadEmployeesSuccess({ employees })),
        catchError(error => of(EmployeeActions.loadEmployeesFailure({ 
          error: error.message || 'Failed to load employees' 
        })))
      )
    )
  ));

  loadEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeActions.loadEmployee),
    mergeMap(({ id }) => this.employeeService.getEmployeeById(id)
      .pipe(
        map(employee => EmployeeActions.loadEmployeeSuccess({ employee })),
        catchError(error => of(EmployeeActions.loadEmployeeFailure({ 
          error: error.message || `Failed to load employee with id ${id}` 
        })))
      )
    )
  ));

  createEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeActions.createEmployee),
    mergeMap(({ employee }) => {
      // Assuming department ID is included in employee object
      const departmentId = employee.departmentId || '';
      return this.employeeService.addEmployee(employee, departmentId)
        .pipe(
          map(createdEmployee => EmployeeActions.createEmployeeSuccess({ employee: createdEmployee })),
          catchError(error => of(EmployeeActions.createEmployeeFailure({ 
            error: error.message || 'Failed to create employee' 
          })))
        );
    })
  ));

  updateEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeActions.updateEmployee),
    mergeMap(({ employee }) => this.employeeService.updateEmployee(employee.id, employee)
      .pipe(
        map(updatedEmployee => EmployeeActions.updateEmployeeSuccess({ employee: updatedEmployee })),
        catchError(error => of(EmployeeActions.updateEmployeeFailure({ 
          error: error.message || `Failed to update employee with id ${employee.id}` 
        })))
      )
    )
  ));

  deleteEmployee$ = createEffect(() => this.actions$.pipe(
    ofType(EmployeeActions.deleteEmployee),
    mergeMap(({ id }) => this.employeeService.deleteEmployee(id)
      .pipe(
        map(() => EmployeeActions.deleteEmployeeSuccess({ id })),
        catchError(error => of(EmployeeActions.deleteEmployeeFailure({ 
          error: error.message || `Failed to delete employee with id ${id}` 
        })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private employeeService: EmployeeService
  ) {}
}
