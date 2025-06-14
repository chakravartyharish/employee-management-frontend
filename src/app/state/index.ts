import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromEmployee from './employees/reducers/employee.reducer';
import { EmployeeState } from './employees/models/employee.state';

export interface AppState {
  employees: EmployeeState;
  // Add other state slices here as your app grows (departments, payments, etc.)
}

export const reducers: ActionReducerMap<AppState> = {
  employees: fromEmployee.employeeReducer,
  // Add other reducers here as your app grows
};

export const metaReducers: MetaReducer<AppState>[] = [];
