import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncoderService {
  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  postEncoder(input: string): Observable<any> {
    const url = this.BASE_URL + '/encoder';
    return this.http.post<any>(url, {input});
  }

}
