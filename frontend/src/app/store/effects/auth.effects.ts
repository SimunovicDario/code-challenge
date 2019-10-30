import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';

import { AuthService } from '../../services/auth.service';
import {
    AuthActionTypes,
    LogIn, LogInSuccess, LogInFailure,
} from '../actions/auth.actions';

@Injectable()
export class AuthEffects {

    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router,
    ) { }


    @Effect()
    LogIn: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.LOGIN),
        map((action: LogIn) => action.payload),
        switchMap((payload) => {
            return this.authService.logIn(payload.email, payload.password).pipe(
                map((user) => {
                    console.log(user);
                    console.log(payload);
                    return new LogInSuccess({ token: user.token, email: user.email });
                }),
                catchError((error) => {
                    console.log(error);
                    return of((new LogInFailure({ error })));
                }));
        }

        ));

    @Effect({ dispatch: false })
    LogInSuccess: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_SUCCESS),
        tap((user) => {
            localStorage.setItem('token', user.payload.token);
            this.router.navigateByUrl('/encoder');
        })
    );

    @Effect({ dispatch: false })
    LogInFailure: Observable<any> = this.actions.pipe(
        ofType(AuthActionTypes.LOGIN_FAILURE)
    );

    @Effect({ dispatch: false })
    GetEncoder: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.GET_ENCODER),
        switchMap(payload => {
            return this.authService.getEncoder();
        }));

}
