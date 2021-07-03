import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase AuthGuardService.
 *
 * Clase que permite acceder a las vistas a aquellos usuarios logueados.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class AuthGuardService implements CanActivate{

  /**
   * Constructor de la clase AuthGuardService.
   * @param router
   * Servicio que permite la navegación entre vistas.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   */
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  /**
   * Método que determina si el usuario puede acceder a la vista o no.
   * Si el usuario está autenticado, entonces puede acceder a la vista. En caso contrario, se le deniega el acceso y se le redirige al login.
   * @param route
   * Contiene la información sobre una ruta asociada a un componente cargado en una salida en un momento determinado.
   * @param state
   * Estructura de datos inmutable que representa el estado del enrutador en un momento determinado.
   *
   * @return
   * true si el usuario puede acceder a la vista, false en caso contrario.
   *
   * @see https://vsavkin.com/angular-router-understanding-router-state-7b5b95a12eab
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.localStorageService.getToken()){
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
