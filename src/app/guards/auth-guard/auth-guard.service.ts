import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {TokenService} from '../../services/token/token.service';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getToken()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
