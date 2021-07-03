import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Locality} from '../../models/locality';

/**
 * Encabezado para las peticiones y respuestas HTTP.
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
/**
 * Clase LocalityService.
 *
 * Clase que se encarga de realizar peticiones a la API relacionadas con las localidades.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class LocalityService {

  /**
   * Almacena la url del endpoint.
   */
  localityURL = 'http://localhost:8090/api/locality';

  /**
   * Constructor de la clase LocalityService.
   * @param httpClient objeto que permite hacer peticiones a la API y obtener resultados de la misma.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición GET para obtener la lista de localidades.
   * @returns el observable con la información enviada por la API.
   */
  public getLocalities(): Observable<Locality[]> {
    return this.httpClient.get<Locality[]>(this.localityURL + '/list', cabecera);
  }

  /**
   * Método que realiza una petición POST para añadir una nueva localidad.
   * @param locality  objeto interés que incluye la información de la nueva localidad.
   * @returns el observable con la información enviada por la API.
   */
  public addLocality(locality): Observable<any> {
    return this.httpClient.post<any>(this.localityURL + '/add', locality, cabecera);
  }

  /**
   * Método que realiza una petición DELETE para eliminar una localidad.
   * @param locality objeto localidad que se quiere eliminar.
   * @returns el observable con la información enviada por la API.
   */
  public deleteLocality(locality): Observable<any> {
    return this.httpClient.delete<any>(this.localityURL + '/delete/' + locality.id, cabecera);
  }

  /**
   * Método que realiza una petición PUT para modificar la información de una localidad.
   * @param id identificador de la localidad.
   * @param locality objeto localidad con la información actualizada.
   * @returns el observable con la información enviada por la API.
   */
  public editLocality(id, locality): Observable<any> {
    return this.httpClient.put<any>(this.localityURL + '/update/' + id, locality, cabecera);
  }
}
