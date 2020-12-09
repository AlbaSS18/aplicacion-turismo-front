import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Interest} from '../../models/interest';
import {User} from '../../models/user';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userURL = 'http://localhost:8090/api/user';
  private userSource = new Subject<User>();
  userObservable = this.userSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userURL + '/list', cabecera);
  }

  public getUser(id): Observable<User> {
    return this.httpClient.get<User>(this.userURL + '/details/' + id, cabecera);
  }

  public editUser(id, user): Observable<any> {
    return this.httpClient.put<any>(this.userURL + '/update/' + id, user, cabecera);
  }

  public deleteUser(id): Observable<any> {
    return this.httpClient.delete<any>(this.userURL + '/delete/' + id, cabecera);
  }

  sendUser(value: User){
    this.userSource.next(value);
  }
}
