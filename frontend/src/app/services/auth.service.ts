import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _$isLoggedin = new BehaviorSubject(false);
  $isloggedin = this._$isLoggedin.asObservable();
  jwt: string = ''
  token: any;
  headers: any | undefined;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this._$isLoggedin.next(true);
      this.jwt = localStorage.getItem("token") || '';
      console.log(this.jwt)
      this.token = this.getUser(this.jwt);
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
        console.log('Data received:', response['token']);

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
