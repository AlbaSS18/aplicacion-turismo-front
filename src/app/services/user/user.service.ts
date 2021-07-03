import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Interest} from '../../models/interest';
import {User} from '../../models/user';

/**
 * Encabezado para las peticiones y respuestas HTTP.
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
/**
 * Clase UserService.
 *
 * Clase que se encarga de realizar peticiones a la API relacionadas con los usuarios.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class UserService {

  /**
   * Almacena la url del endpoint.
   */
  userURL = 'http://localhost:8090/api/user';

  /**
   * Constructor de la clase UserService.
   * @param httpClient objeto que permite hacer peticiones a la API y obtener resultados de la misma.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición GET para obtener la lista de usuarios registrados en el sistema.
   * @returns el observable con la información enviada por la API.
   */
  public getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.userURL + '/list', cabecera);
  }

  /**
   * Método que realiza una petición GET para obtener un usuario.
   * @param id identificador del usuario.
   * @returns el observable con la información enviada por la API.
   */
  public getUserForAdmin(id): Observable<User> {
    return this.httpClient.get<User>(this.userURL + '/details/' + id, cabecera);
  }

  /**
   * Método que realiza una petición GET para obtener un usuario.
   * @param id identificador del usuario.
   * @returns el observable con la información enviada por la API.
   */
  public getUser(id): Observable<User> {
    return this.httpClient.get<User>(this.userURL + '/details/' + id, cabecera);
  }

  /**
   * Método que realiza una petición PUT para modificar la información de un usuario.
   * @param id identificador del usuario.
   * @param user objeto usuario con la información actualizada.
   * @returns el observable con la información enviada por la API.
   */
  public editUser(id, user): Observable<any> {
    return this.httpClient.put<any>(this.userURL + '/update/' + id, user, cabecera);
  }

  /**
   * Método que realiza una petición DELETE para eliminar un usuario.
   * @param id identificador del usuario.
   * @returns el observable con la información enviada por la API.
   */
  public deleteUser(id): Observable<any> {
    return this.httpClient.delete<any>(this.userURL + '/delete/' + id, cabecera);
  }
}
