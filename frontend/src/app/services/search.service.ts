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
  PlacesBylocation(lat: number, lng: number): Observable<any> {
    return this.http.get(`http://localhost:5163/api/Entreprise/${lat}/${lng}`);
  }
  GetCountries(): Observable<any> {
    return this.http.get('http://localhost:5163/api/Ville');
  }
  GetCities(id: number): Observable<any> {
    return this.http.get("http://localhost:5163/api/Ville/" + id);
  }
  TopPlacesByCity(id: number): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/Top?CityId=' + id);
  }
  TopPlacesByQuery(query: string): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/Top?Query=' + query);
  }
  TopPlacesByLocation(lat: number, lng: number): Observable<any> {
    return this.http.get(`http://localhost:5163/api/Entreprise/Top?Lat=${lat}&Lng=${lng}`)
  }
  TopPlaces(): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/Top');
  }
  TopFiveeatchtype(): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/top/type');

  }
  UpdatePlace(place: any, placeid: number): Observable<any> {
    return this.http.put("http://localhost:5163/api/Entreprise/" + placeid, place, { headers: this.authservice.headers });
  }
  CreatePlace(place: any): Observable<any> {
    return this.http.post('http://localhost:5163/api/Entreprise/', place, { headers: this.authservice.headers })
  }
  getAdminplace(): Observable<any> {
    return this.http.get('http://localhost:5163/api/Entreprise/Admin/place', { headers: this.authservice.headers })

  }
}
