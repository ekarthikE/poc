import { createAction, props } from "@ngrx/store";
import { UserModel } from "../store.model";

export const login = createAction(
    '[loginModule] log user Action',
    props<UserModel>()
);