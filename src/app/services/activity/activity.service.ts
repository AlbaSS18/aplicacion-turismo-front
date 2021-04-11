import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLogin} from '../../models/user';
import {Observable} from 'rxjs';
import {JwtModel} from '../../models/jwt_model';
import {Activity, ActivityRecommended} from '../../models/activity';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  activityUrl = 'http://localhost:8090/api/activity';

  constructor(private httpClient: HttpClient) { }

  public getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.activityUrl + '/list', cabecera);
  }

  public getActivity(id): Observable<Activity> {
    return this.httpClient.get<Activity>(this.activityUrl + '/details/' + id, cabecera);
  }

  public addActivity(formData): Observable<any> {
    return this.httpClient.post<any>(this.activityUrl + '/add', formData);
  }

  public deleteActivity(id): Observable<any> {
    return this.httpClient.delete<any>(this.activityUrl + '/delete/' + id, cabecera);
  }

  public editActivity(id, activity): Observable<any> {
    return this.httpClient.put<any>(this.activityUrl + '/update/' + id, activity);
  }

  public postRateActivity(activityRate): Observable<any>{
    return this.httpClient.post<any>(this.activityUrl + '/rate', activityRate);
  }

  public getRecommendedActivities(idUser): Observable<ActivityRecommended[]> {
    return this.httpClient.get<ActivityRecommended[]>(this.activityUrl + '/recommedation/' + idUser, cabecera);
  }
}
