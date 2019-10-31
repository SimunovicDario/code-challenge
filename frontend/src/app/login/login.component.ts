import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CommonValidators } from 'ng-validator';
import { ValidatePasswordLength } from '../validators/passwordLength.validator';
import { ValidatePasswordDigit } from '../validators/passwordDigit.validator';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState, selectAuthState } from '../store/app.states';
import { LogIn } from '../store/actions/auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string | null;
  getState: Observable<any>;
  user: User = new User();

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
   }

  ngOnInit() {
    this.loginForm = new FormGroup({
      inputEmail: new FormControl('', [Validators.required, CommonValidators.isEmail]),
      inputPassword: new FormControl('', [Validators.required, ValidatePasswordLength, ValidatePasswordDigit])
    });

    this.getState.subscribe((state) => {
      this.errorMessage = state.errorMessage;
    });
  }

  onSubmit(): void {
    const payload = {
      email: this.loginForm.get('inputEmail').value.toLowerCase(),
      password: this.loginForm.get('inputPassword').value
    };
    this.store.dispatch(new LogIn(payload));
  }

}
