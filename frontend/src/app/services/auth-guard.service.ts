import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { AuthService } from './auth.service';
import { AppState, selectAuthState } from '../store/app.states';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuardService implements CanActivate {
  private getIsAuthenticated: Observable<any>;
  private isAuthenticated: boolean;

  constructor(
    public auth: AuthService,
    public router: Router,
    private store: Store<AppState>
  ) {
    this.getIsAuthenticated = this.store.select(selectAuthState);
    this.getIsAuthenticated.subscribe((state) => {
      this.isAuthenticated = state.isAuthenticated;
    });
  }
  // !!!
  canActivate(): boolean {
    if (!this.auth.getToken() && !this.isAuthenticated) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}

