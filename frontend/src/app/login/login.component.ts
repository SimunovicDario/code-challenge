import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CommonValidators } from 'ng-validator';
import { ValidatePasswordLength } from '../validators/passwordLength.validator';
import { ValidatePasswordDigit } from '../validators/passwordDigit.validator';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string;
  user: User = new User();

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      inputEmail: new FormControl('', [Validators.required, CommonValidators.isEmail]),
      inputPassword: new FormControl('', [Validators.required, ValidatePasswordLength, ValidatePasswordDigit])
    });

  }

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
