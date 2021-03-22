import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate{

  rol: string;

  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRol = route.data.expectedRol;
    const roles = this.localStorageService.getRolesUser();
    if (roles.includes("ROLE_ADMIN")){
      this.rol = 'admin';
    }
    else{
      this.rol = 'user';
    }
    if (!this.localStorageService.getToken() || expectedRol.indexOf(this.rol) === -1 ){
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
