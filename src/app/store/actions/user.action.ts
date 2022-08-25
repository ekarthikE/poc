import { createAction, props } from "@ngrx/store";
import { EmployeeModel, UserModel } from "../store.model";

export const login = createAction(
  '[loginModule] log user Action',
  props<UserModel>()
);

export const loginSuccess = createAction(
  '[loginModule] login success',
  props<{employee: EmployeeModel[]}>()
)

export const loginFailure = createAction(
  '[loginModule] login failure',
  props<{ message: string }>()
)
