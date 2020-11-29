import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Interest} from '../../models/interest';
import {Rol} from '../../models/rol';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolURL = 'http://localhost:8090/api/rol';

  constructor(private httpClient: HttpClient) { }

  public getRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.rolURL + '/list', cabecera);
  }
}
