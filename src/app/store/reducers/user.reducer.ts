import { createReducer, on } from '@ngrx/store';
import { login } from '../actions/user.action';
import { UserModel } from '../store.model';

export const user: UserModel = {
    userId: '',
    password: ''
};

export const userReducer = createReducer(
    user,
    on(login, (state: any, { userId, password }) => {
        return { userId, password };
    })
);
