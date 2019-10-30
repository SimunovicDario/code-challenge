import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CommonValidators } from 'ng-validator';
import { ValidatePasswordLength } from '../validators/passwordLength.validator';
import { ValidatePasswordDigit } from '../validators/passwordDigit.validator';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.states';
import { LogIn } from '../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  user: User = new User();

  constructor(private store: Store<AppState>, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      inputEmail: new FormControl('', [Validators.required, CommonValidators.isEmail]),
      inputPassword: new FormControl('', [Validators.required, ValidatePasswordLength, ValidatePasswordDigit])
    });

  }

  onSubmit(): void {
    const payload = {
      email: this.user.email,
      password: this.user.password
    };
    console.log(payload);
    this.store.dispatch(new LogIn(payload));
  }

  // original koji radi

  onLogin() {
    this.errorMessage = '';
    const email = this.loginForm.get('inputEmail').value.toLowerCase();
    const password = this.loginForm.get('inputPassword').value;
    this.loginService.login(email, password)
      .subscribe(data => {
        this.user.email = email;
        this.user.password = password;
        this.user.token = data.token;
      },
        err => {
          this.errorMessage = err.error;
        });
  }

}
