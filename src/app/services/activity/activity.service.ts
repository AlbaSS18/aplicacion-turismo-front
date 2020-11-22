import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLogin} from '../../models/user';
import {Observable} from 'rxjs';
import {JwtModel} from '../../models/jwt_model';
import {Activity} from '../../models/activity';

const cabecera = {headers: new HttpHeaders({'Content-TYpe': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activityUrl = 'http://localhost:8090/api/activity';

  constructor(private httpClient: HttpClient) { }

  public getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.activityUrl + '/list', cabecera);
  }
}
