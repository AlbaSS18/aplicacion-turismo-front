import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY);
  }

  public logOut(): void {
    window.localStorage.clear();
  }

  getEmailUser() {
    var token = this.getToken();
    var decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.sub : null;
  }

  getRolesUser() {
    var token = this.getToken();
    var decodedToken = this.decodeToken(token);
    return decodedToken ? decodedToken.ROLES : [];
  }

  decodeToken(token): any {
    if (token) {
      return jwt_decode(token);
    }
  }
}
