import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdsService {

  constructor(private http: HttpClient, private authservice: AuthService) { }
  createad(adData: any): Observable<any> {
    return this.http.post('http://localhost:5163/api/News', adData, { headers: this.authservice.headers })
  }
  getadsbyEntreprise(id: number): Observable<any> {
    return this.http.get(`http://localhost:5163/api/News/Place/${id}`);
  }

}
