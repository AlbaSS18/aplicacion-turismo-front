import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';
const EMAIL_KEY = 'AuthEmail';
const AUTHORITIES_KEY = 'AutAuthorities';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public logOut(): void {
    window.sessionStorage.clear();
  }
}
