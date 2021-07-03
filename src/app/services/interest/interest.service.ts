import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Interest, InterestByUser} from '../../models/interest';
import {Observable} from 'rxjs';

/**
 * Encabezado para las peticiones y respuestas HTTP.
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})}; //Headers serán contenido JSON

@Injectable({
  providedIn: 'root'
})
/**
 * Clase InterestService.
 *
 * Clase que se encarga de realizar peticiones a la API relacionadas con los tipos de intereses.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class InterestService {

  /**
   * Almacena la url del endpoint.
   */
  interestURL = 'http://localhost:8090/api/interest';

  /**
   * Constructor de la clase InterestService.
   * @param httpClient Objeto que permite hacer peticiones a la API y obtener resultados de la misma.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición GET para obtener la lista de los tipos de intereses.
   * @returns El observable con la información enviada por la API.
   */
  public getInterests(): Observable<Interest[]> {
    return this.httpClient.get<Interest[]>(this.interestURL + '/list', cabecera);
  }

  /**
   * Método que realiza una petición POST para añadir un nuevo tipo de interés.
   * @param interest Objeto interés que incluye la información del nuevo tipo de interés.
   * @returns El observable con la información enviada por la API.
   */
  public addInterests(interest): Observable<any> {
    return this.httpClient.post<any>(this.interestURL + '/add', interest, cabecera);
  }

  /**
   * Método que realiza una petición DELETE para eliminar un tipo de interés.
   * @param interest Objeto interés que se quiere eliminar.
   * @returns El observable con la información enviada por la API.
   */
  public deleteInterest(interest): Observable<any> {
    return this.httpClient.delete<any>(this.interestURL + '/delete/' + interest.id, cabecera);
  }

  /**
   * Método que realiza una petición GET para obtener las puntuaciones dadas por el usuario a un tipo de interés.
   * @param id Identificador del usuario.
   * @returns El observable con la información enviada por la API.
   */
  public getInterestByUser(id): Observable<InterestByUser[]> {
    return this.httpClient.get<InterestByUser[]>(this.interestURL + '/list/user/' + id, cabecera);
  }

  /**
   * Método que realiza una petición PUT para modificar la información de un tipo de interés.
   * @param id Identificador del tipo de interés.
   * @param interest Objeto actividad con la información actualizada.
   * @returns El observable con la información enviada por la API.
   */
  public editInterest(id, interest): Observable<any> {
    return this.httpClient.put<any>(this.interestURL + '/update/' + id, interest, cabecera);
  }
}
