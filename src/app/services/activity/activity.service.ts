import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLogin} from '../../models/user';
import {Observable} from 'rxjs';
import {JwtModel} from '../../models/jwt_model';
import {Activity, ActivityRecommended} from '../../models/activity';

/**
 * Encabezado para las peticiones y respuestas HTTP
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
/**
 * Clase ActivityService
 * 
 * Clase que se encarga de realizar peticiones a la API relacionadas con las actividades.
 */
export class ActivityService {

  /**
   * Almacena la url del endpoint
   */
  activityUrl = 'http://localhost:8090/api/activity';

  /**
   * Constructor de la clase ActivityService
   * @param httpClient objeto que permite hacer peticiones a la API y obtener resultados de la misma
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición GET para obtener la lista de actividades.
   * @returns el observable con la información enviada por la API
   */
  public getActivities(): Observable<Activity[]> {
    return this.httpClient.get<Activity[]>(this.activityUrl + '/list', cabecera);
  }
  
  /**
   * Método que realiza una petición GET para obtener una actividad.
   * @param id identificador de la actividad
   * @returns el observable con la información enviada por la API
   */
  public getActivity(id): Observable<Activity> {
    return this.httpClient.get<Activity>(this.activityUrl + '/details/' + id, cabecera);
  }

  /**
   * Método que realiza una petición POST para añadir una nueva actividad.
   * @param formData objeto FormData que incluye la información de la nueva actividad.
   * @returns el observable con la información enviada por la API
   */
  public addActivity(formData): Observable<any> {
    return this.httpClient.post<any>(this.activityUrl + '/add', formData);
  }

  /**
   * Método que realiza una petición DELETE para eliminar una actividad.
   * @param id identificador de la actividad
   * @returns el observable con la información enviada por la API 
   */
  public deleteActivity(id): Observable<any> {
    return this.httpClient.delete<any>(this.activityUrl + '/delete/' + id, cabecera);
  }


  /**
   * Método que realiza una petición PUT para modificar la información de una actividad.
   * @param id identificador de la actividad
   * @param activity objeto actividad con la información actualizada.
   * @returns el observable con la información enviada por la API 
   */
  public editActivity(id, activity): Observable<any> {
    return this.httpClient.put<any>(this.activityUrl + '/update/' + id, activity);
  }

  /**
   * Método que realiza una petición POST para añadir una nueva valoración a una actividad.
   * @param activityRate objeto con la valoración del usuario a una actividad
   * @returns el observable con la información enviada por la API 
   */
  public postRateActivity(activityRate): Observable<any>{
    return this.httpClient.post<any>(this.activityUrl + '/rate', activityRate);
  }

  /**
   * Método que realiza una petición GET para obtener la lista de actividades recomendadas al usuario.
   * @param idUser identificador del usuario
   * @returns el observable con la información enviada por la API
   */
  public getRecommendedActivities(idUser): Observable<ActivityRecommended[]> {
    return this.httpClient.get<ActivityRecommended[]>(this.activityUrl + '/recommedation/' + idUser, cabecera);
  }

  /**
   * Método que realiza una petición GET para obtener la lista de actividades valoradas por el usuario.
   * @param idUser identificador del usuario
   * @returns el observable con la información enviada por la API
   */
  public getRatedActivities(idUser): Observable<ActivityRecommended[]> {
    return this.httpClient.get<ActivityRecommended[]>(this.activityUrl + '/ratedActivities/' + idUser, cabecera);
  }
}
