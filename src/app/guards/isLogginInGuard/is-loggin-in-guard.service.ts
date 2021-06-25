import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
/**
 * Clase IsLogginInGuardService
 *
 * Clase que impide a los usuarios acceder a las vistas cuando ya se encuentran autenticados.
 */
export class IsLogginInGuardService implements Resolve<any>{

  /**
   * Constructor de la clase IsLogginInGuardService
   * @param router
   * Servicio que permite la navegación entre vistas
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador
   */
  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  /**
   * Método que realiza comprobaciones antes de navegar a la ruta.
   * En este caso, si el usuario se encuentra autenticado e intenta acceder a una vista a la que acceden únicamente usuarios no identificados,
   * se le redirigirá a una de las páginas iniciales.
   */
  resolve() {
    if (this.localStorageService.getToken()) {
      const roles = this.localStorageService.getRolesUser();
      if (roles.includes("ROLE_ADMIN")){
        this.router.navigate(['/user']);
      }
      else{
        this.router.navigate(['/recommendationMap']);
      }
    }
  }
}
