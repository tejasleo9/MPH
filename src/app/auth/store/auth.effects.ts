import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import {
  AuthActionTypes,
  LogIn, LogInSuccess, LogInFailure,
} from './auth.actions';

@Injectable()
export class AuthEffects {

  constructor(
    private actions: Actions,
    private authService: AuthService,
    private router: Router,
  ) { }

  // effects go here

  @Effect()
  LogIn: Observable<any> = this.actions
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          // console.log(user.status_code);
          if (user.status_code == 200) {
            return new LogInSuccess({ token: user.data.token, email: payload.email });
          } else {
            // console.log(user);
            return new LogInFailure({ error: user });
            // return Observable.of(new LogInFailure({ error: user }));
          }
        })
        .catch((error) => {
          // console.log(error);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      // console.log(user)
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('project');
    })
  );
  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap((user) => {
      // console.log(user);
      // localStorage.setItem('token', user.payload.token);
      // this.router.navigateByUrl('project');
    })
  );

}