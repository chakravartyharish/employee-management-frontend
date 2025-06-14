import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeeAdapter, EmployeeState } from '../models/employee.state';

export const selectEmployeeState = createFeatureSelector<EmployeeState>('employees');

const { selectIds, selectEntities, selectAll, selectTotal } = employeeAdapter.getSelectors();

export const selectAllEmployees = createSelector(
  selectEmployeeState,
  selectAll
);

export const selectEmployeeEntities = createSelector(
  selectEmployeeState,
  selectEntities
);

export const selectEmployeeIds = createSelector(
  selectEmployeeState,
  selectIds
);

export const selectEmployeeTotal = createSelector(
  selectEmployeeState,
  selectTotal
);

export const selectEmployeeLoading = createSelector(
  selectEmployeeState,
  state => state.loading
);

export const selectEmployeeError = createSelector(
  selectEmployeeState,
  state => state.error
);

export const selectSelectedEmployeeId = createSelector(
  selectEmployeeState,
  state => state.selectedEmployeeId
);

export const selectSelectedEmployee = createSelector(
  selectEmployeeEntities,
  selectSelectedEmployeeId,
  (employeeEntities, employeeId) => employeeId ? employeeEntities[employeeId] : null
);
