import { createReducer, on } from '@ngrx/store';
import * as loginAction from '../actions/user.action';
import { EmployeeModel } from '../store.model';

export const employee: EmployeeModel[] = [];

export const employeeReducer = createReducer(
  employee,
  on(loginAction.loginSuccess, (state: any, result: any) => {
    return result;
  })
);
