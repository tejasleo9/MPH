import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  private BASE_URL = 'http://m4-live.mysurveyhub.com/v1/';

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}auth/authenticate`;
    return this.http.post<User>(url, { email, password });
  }

  signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, { email, password });
  }

  sendForgotPasswordEmail(obj): Observable<any> {
    const url = `${this.BASE_URL}account/send-forgot-password-mail`;
    return this.http.post<any>(url, obj);
  }

  validateToken(obj): Observable<any> {
    const url = `${this.BASE_URL}account/validate-token-forgot-password`;
    return this.http.post<any>(url, obj);
  }

  setForgotPassword(obj): Observable<any> {
    const url = `${this.BASE_URL}account/set-forgot-password`;
    return this.http.post<any>(url, obj);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}