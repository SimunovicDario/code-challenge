import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { AppState } from '../store/app.states';
import { Store } from '@ngrx/store';


@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {}
// !!!
  canActivate(): boolean {
    if (!this.auth.getToken() && this.store.select(user => user.authState.isAuthenticated)) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}