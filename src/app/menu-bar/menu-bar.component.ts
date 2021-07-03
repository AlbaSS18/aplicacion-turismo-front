import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {PrimeNGConfig} from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: [
    './menu-bar.component.scss'
  ],
})
/**
 * Clase MenuBarComponent.
 *
 * Clase que proporciona enlaces a las diferentes páginas de la aplicación.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class MenuBarComponent implements OnInit {
  /**
   * Indica si el usuario está autenticado o no.
   */
  isLogin = false;
  /**
   * Roles del usuario autenticado.
   */
  roles: string[];
  /**
   * Rol que identifica al usuario.
   */
  authority: string;
  /**
   * Email del usuario autenticado.
   */
  email;

  /**
   * Constructor de la clase MenuBarComponent.
   *
   * @param router
   * Servicio que permite la navegación entre vistas.
   * @param translate
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   * @param config
     Servicio propocionado por la librería PrimeNG que permite tener acceso a la API I18N proporcionada por dicha librería.
   */
  constructor(
    private router: Router,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    private config: PrimeNGConfig
  ) {}

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>El email del usuario autenticado.</li>
   *      <li>Los roles del usuario autenticado.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.email = this.localStorageService.getEmailUser();
    if (this.localStorageService.getToken()){
      this.isLogin = true;
      this.roles = [];
      this.roles = this.localStorageService.getRolesUser();
      if (this.roles.includes("ROLE_ADMIN")){
        this.authority = 'admin';
      }
      else {
        this.authority = 'user';
      }
    }
  }

  /**
   * Método que permite cerrar sesión a un usuario autenticado y le redirige de vuelta a la página de inicio de sesión.
   */
  logOut(): void {
    this.localStorageService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigateByUrl('/login');
  }

  /**
   * Método que permite cambiar el idioma a la aplicación.
   *
   * @param lang
   * El idioma a utilizar.
   */
  switchLang(lang: string) {
    this.translate.use(lang);
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
