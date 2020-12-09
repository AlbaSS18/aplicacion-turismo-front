import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Interest} from '../../models/interest';
import {Observable} from 'rxjs';


const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})}; //Headers serán contenido JSON

@Injectable({
  providedIn: 'root'
})
export class InterestService {


  interestURL = 'http://localhost:8090/api/interest';

  constructor(private httpClient: HttpClient) { }

  public getInterests(): Observable<Interest[]> {
    return this.httpClient.get<Interest[]>(this.interestURL + '/list', cabecera);
  }

  public addInterests(interest): Observable<any> {
    return this.httpClient.post<any>(this.interestURL + '/add', interest, cabecera);
  }

  public deleteInterest(interest): Observable<any> {
    return this.httpClient.delete<any>(this.interestURL + '/delete/' + interest.id, cabecera);
  }
}
