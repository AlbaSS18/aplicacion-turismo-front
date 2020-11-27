import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Interest} from '../../models/interest';
import {User} from '../../models/user';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = 'http://localhost:8090/api/user';

  constructor(private httpClient: HttpClient) { }

  public getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userURL + '/list', cabecera);
  }

  public editUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userURL + '/list', cabecera);
  }
}
