import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Interest} from '../../models/interest';
import {Rol} from '../../models/rol';

/**
 * Encabezado para las peticiones y respuestas HTTP.
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
/**
 * Clase RolService.
 *
 * Clase que se encarga de realizar peticiones a la API relacionadas con los tipos de roles.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class RolService {

  /**
   * Almacena la url del endpoint.
   */
  rolURL = 'http://localhost:8090/api/rol';

  /**
   * Constructor de la clase RolService.
   * @param httpClient objeto que permite hacer peticiones a la API y obtener resultados de la misma.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición GET para obtener la lista de los tipos de roles.
   * @return el observable con la información enviada por la API.
   */
  public getRoles(): Observable<Rol[]> {
    return this.httpClient.get<Rol[]>(this.rolURL + '/list', cabecera);
  }
}

