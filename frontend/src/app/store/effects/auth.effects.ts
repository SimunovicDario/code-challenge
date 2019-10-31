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
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EncoderService } from 'src/app/services/encoder.service';

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
                    return new LogInSuccess({ token: user.token, email: user.email });
                }),
                catchError((error) => {
                    return of(new LogInFailure(error));
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
    LogInFailure: Observable<any> = this.actions.pipe(ofType(AuthActionTypes.LOGIN_FAILURE));

}
