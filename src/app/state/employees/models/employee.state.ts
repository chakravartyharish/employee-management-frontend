import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Employee } from '../../../models/employee.model';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string | null;
  selectedEmployeeId: string | null;
}

export const employeeAdapter = createEntityAdapter<Employee>({
  selectId: (employee: Employee) => employee.id,
  sortComparer: (a: Employee, b: Employee) => a.name.localeCompare(b.name)
});

export const initialEmployeeState = employeeAdapter.getInitialState({
  loading: false,
  error: null,
  selectedEmployeeId: null
}) as EmployeeState;
