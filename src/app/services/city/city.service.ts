import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UserLogin} from '../../models/user';
import {Observable} from 'rxjs';
import {JwtModel} from '../../models/jwt_model';
import {City} from '../../models/city';

/**
 * Encabezado para las peticiones y respuestas HTTP
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
/**
 * Clase CityService
 * 
 * Clase que se encarga de realizar peticiones a la API relacionadas con las localidades.
 */
export class CityService {

  /**
   * Almacena la url del endpoint
   */
  cityURL = 'http://localhost:8090/api/city';

  /**
   * Constructor de la clase CityService
   * @param httpClient objeto que permite hacer peticiones a la API y obtener resultados de la misma
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición GET para obtener la lista de localidades.
   * @returns el observable con la información enviada por la API
   */
  public getCities(): Observable<City[]> {
    return this.httpClient.get<City[]>(this.cityURL + '/list', cabecera);
  }

  /**
   * Método que realiza una petición POST para añadir una nueva localidad.
   * @param city  objeto interés que incluye la información de la nueva localidad
   * @returns el observable con la información enviada por la API
   */
  public addCity(city): Observable<any> {
    return this.httpClient.post<any>(this.cityURL + '/add', city, cabecera);
  }

  /**
   * Método que realiza una petición DELETE para eliminar una localidad.
   * @param city objeto localidad que se quiere eliminar
   * @returns el observable con la información enviada por la API
   */
  public deleteCity(city): Observable<any> {
    return this.httpClient.delete<any>(this.cityURL + '/delete/' + city.id, cabecera);
  }

  /**
   * Método que realiza una petición PUT para modificar la información de una localidad.
   * @param id identificador de la localidad
   * @param city objeto localidad con la información actualizada. 
   * @returns el observable con la información enviada por la API
   */
  public editCity(id, city): Observable<any> {
    return this.httpClient.put<any>(this.cityURL + '/update/' + id, city, cabecera);
  }
}
