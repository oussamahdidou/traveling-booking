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
    const formData: FormData = new FormData();
    formData.append('content', adData.content);
    formData.append('title', adData.title);
    formData.append('entrepriseId', adData.entrepriseId.toString());
    formData.append('image', adData.image);
    return this.http.post('http://localhost:5163/api/News', formData, { headers: this.authservice.headers })

  }
  getadsbyEntreprise(id: number): Observable<any> {
    return this.http.get(`http://localhost:5163/api/News/Place/${id}`);
  }

}
