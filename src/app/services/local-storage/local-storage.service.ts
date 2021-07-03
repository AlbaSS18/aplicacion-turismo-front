import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

/**
 * Clave para almacenar el valor del token en el LocalStorage.
 */
const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase LocalStorageService.
 *
 * Clase que se encarga de acceder al objeto LocalStorage del navegador.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class LocalStorageService {

  constructor() { }

  /**
   * Método que almacena el nuevo token en el objeto LocalStorage.
   * @param token Token.
   */
  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Método que obtiene el token del objeto LocalStorage.
   * @returns El token.
   */
  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  /**
   * Método que elimina la información almacenada en el objeto LocalStorage.
   */
  public logOut(): void {
    window.localStorage.clear();
  }

  /**
   * Método que obtiene el email del token.
   * @returns El email del usuario si se encuentra autenticado o null en caso contrario.
   */
  getEmailUser() {
    var token = this.getToken();
    var decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.sub : null;
  }

  /**
   * Método que obtiene los roles del token.
   * @returns Los roles del usuario si se encuentra autenticado o null en caso contrario.
   */
  getRolesUser() {
    var token = this.getToken();
    var decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.ROLES : [];
  }

  /**
   * Método que decodifica el token de acceso.
   * @param token Token.
   * @returns Objeto con la información decodificada del token.
   */
  decodeToken(token): any {
    if (token) {
      return jwt_decode(token);
    }
  }
}
