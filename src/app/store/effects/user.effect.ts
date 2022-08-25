import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { HttpService } from "../../employee/http.service";
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as loginActions from '../actions/user.action';

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private httpService: HttpService
  ) { }

  userLogin$ = createEffect(() =>
    this.actions.pipe(
      ofType(loginActions.login),
      exhaustMap(action =>
        this.httpService.getEmployees().pipe(
          map(response => {
            return loginActions.loginSuccess(response)
          }),
          catchError((error: any) => of(loginActions.loginFailure(error))))
      )
    )
  );
}
