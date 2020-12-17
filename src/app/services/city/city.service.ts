import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLogin} from '../../models/user';
import {Observable} from 'rxjs';
import {JwtModel} from '../../models/jwt_model';
import {City} from '../../models/city';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class CityService {

  cityURL = 'http://localhost:8090/api/city';

  constructor(private httpClient: HttpClient) { }

  public getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.cityURL + '/list', cabecera);
  }

  public addCity(city): Observable<any> {
    return this.httpClient.post<any>(this.cityURL + '/add', city, cabecera);
  }

  public deleteCity(city): Observable<any> {
    return this.httpClient.delete<any>(this.cityURL + '/delete/' + city.id, cabecera);
  }
}
