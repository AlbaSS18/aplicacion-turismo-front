import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  jwtToken: string;
  decodedToken;

  constructor() { }

  setToken(token: string){
    if (token){
      this.jwtToken = token;
    }
  }

  decodeToken() {
    if (this.jwtToken) {
      this.decodedToken = jwt_decode(this.jwtToken);
    }
  }

  getEmailUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.sub : null;
  }

  getRolesUser() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.ROLES : null;
  }


}
