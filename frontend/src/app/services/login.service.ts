import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    return this.http.post<any>('http://localhost:3000/login', { email, password });
  }

}
