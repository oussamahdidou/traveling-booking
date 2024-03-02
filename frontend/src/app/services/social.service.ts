import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocialService {

  constructor(private http: HttpClient, private authservice: AuthService) { }

  getuserrate(id: number): Observable<any> {
    return this.http.get('http://localhost:5163/api/Social/rate/' + id, {
      headers: this.authservice.headers
    });
  }
  rate(rate: number, entrepriseId: number): Observable<any> {
    return this.http.post('http://localhost:5163/api/Social/Rate', {
      "appUserId": '',
      "rate": rate,
      "entrepriseId": entrepriseId
    },
      {
        headers: this.authservice.headers
      });
  }
  addcomment(text: string, entrepriseId: number): Observable<any> {
    return this.http.post('http://localhost:5163/api/Social/Comment', {
      content: text,
      entrepriseId: entrepriseId,
      appUserId: ''
    },
      { headers: this.authservice.headers });
  }
  getcomments(id: number): Observable<any> {
    return this.http.get('http://localhost:5163/api/Social/' + id);
  }
}
