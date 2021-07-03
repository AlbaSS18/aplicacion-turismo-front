import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserLogin, UserSignUp} from '../../models/user';
import {JwtModel} from '../../models/jwt_model';

/**
 * Encabezado para las peticiones y respuestas HTTP.
 */
const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};

@Injectable({
  providedIn: 'root'
})
/**
 * Clase AuthService.
 *
 * Clase que se encarga de realizar peticiones a la API relacionadas con la autenticación.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class AuthService {

  /**
   * Almacena la url del endpoint.
   */
  authURL = 'http://localhost:8090/api/auth';

  /**
   * Constructor de la clase AuthService.
   * @param httpClient objeto que permite hacer peticiones a la API y obtener resultados de la misma.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Método que realiza una petición POST para autenticar al usuario.
   * @param user objeto usuario que incluye la información del usuario que se intenta autenticar.
   * @returns el observable con la información enviada por la API.
   */
  public login(user: UserLogin): Observable<JwtModel> {
    return this.httpClient.post<JwtModel>(this.authURL + '/login', user, cabecera);
  }

  /**
   * Método que realiza una petición POST para registrar a un usuario.
   * @param user objeto usuario que incluye la información del usuario que se registra.
   * @returns el observable con la información enviada por la API.
   */
  public signUp(user: UserSignUp): Observable<any> {
    return this.httpClient.post<any>(this.authURL + '/signup', user, cabecera);
  }
}
