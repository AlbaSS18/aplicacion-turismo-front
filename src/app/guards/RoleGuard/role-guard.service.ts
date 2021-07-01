import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase RoleGuardService.
 *
 * Clase que permite acceder a las vistas a aquellos usuarios cuyo rol coincida con el esperado.
 */
export class RoleGuardService implements CanActivate{

  /**
   * Rol del usuario.
   */
  rol: string;

  /**
   * Constructor de la clase RoleGuardService.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   * @param router
   * Servicio que permite la navegación entre vistas.
   */
  constructor(private localStorageService: LocalStorageService, private router: Router) { }

  /**
   * Método que determina si el usuario puede acceder a la vista o no.
   * Si el usuario está autenticado y su rol coincide con el esperado, entonces puede acceder a la vista. En caso contrario, se le deniega el acceso y se le redirige al login.
   * @param route
   * Contiene la información sobre una ruta asociada a un componente cargado en una salida en un momento determinado.
   * @param state
   * Estructura de datos inmutable que representa el estado del enrutador en un momento determinado.
   *
   * @return
   * true si el usuario puede acceder a la vista, false en caso contrario
   *
   * @see https://vsavkin.com/angular-router-understanding-router-state-7b5b95a12eab
   */
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
