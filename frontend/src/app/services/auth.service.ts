import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _$isLoggedin = new BehaviorSubject(false);
  $isloggedin = this._$isLoggedin.asObservable();
  private _$IsAdmin = new BehaviorSubject(false);
  $IsAdmin = this._$IsAdmin.asObservable();
  jwt: string = ''
  token: any;
  headers: any | undefined;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this._$isLoggedin.next(true);
      this.jwt = localStorage.getItem("token") || '';
      this.token = this.getUser(this.jwt);
      if (this.token && this.token.role === "admin") {
        this._$IsAdmin.next(true);
      }
      this.headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.jwt);
    }
    else {
      this._$isLoggedin.next(false);
    }
  }
  getUser(token: string) {
    return JSON.parse(atob((token.split('.')[1])))
  }
  logout() {
    localStorage.removeItem('token');
    this._$isLoggedin.next(false);
  }
  login(username: string, password: string): Observable<any> {
    return this.http.post('http://localhost:5163/api/Account/Login', { username, password }).pipe(
      tap(response => {

        localStorage.setItem('token', response['token']);
        this._$isLoggedin.next(true);
      },
        error => {
          console.log(error);
        }
      )
    );

  }
}
