import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient, private authservice: AuthService) { }
  search(query: string): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/Search/' + query);
  }
  PlacesByCity(id: number): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/Ville/' + id);
  }
  PlacesByQuery(query: string): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise?Search=' + query);
  }
  PlaceById(id: number): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/' + id);
  }

}
