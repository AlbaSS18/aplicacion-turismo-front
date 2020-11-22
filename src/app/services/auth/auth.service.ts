import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLogin, UserSignUp} from '../../models/user';
import {JwtModel} from '../../models/jwt_model';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = 'http://localhost:8090/api/auth';

  constructor(private httpClient: HttpClient) { }

  public login(user: UserLogin): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + '/login', user, cabecera);
  }

  public signUp(user: UserSignUp): Observable<any> {
    return this.httpClient.post<any>(this.authURL + '/signup', cabecera);
  }
}
