import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message, MessageService} from 'primeng/api';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../services/message/notification.service';
import {LocalStorageService} from '../services/local-storage/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
/**
 * Clase LoginComponent
 *
 * Clase que permite iniciar sesión a un usuario.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class LoginComponent implements OnInit {

  /**
   * Formulario para iniciar sesión en la aplicación.
   */
  loginForm: FormGroup;
  /**
   * Indica si el inicio de sesión falló.
   */
  isLoginFail = false;
  /**
   * Almacena los roles del usuario autenticado.
   */
  roles: string[] = [];
  /**
   * Almacena el mensaje que se muestra al usuario.
   */
  infoMessage = [];

  /**
   * Constructor de la clase LoginComponent
   *
   * @param authService
   * Servicio de autenticación.
   * @param formBuilder
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param router
   * Servicio que permite la navegación entre vistas
   * @param route
   *
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param notification
   * Servicio que permite almacenar notificaciones.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   */
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translateService: TranslateService,
    private notification: NotificationService,
    private localStorageService: LocalStorageService) {}

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>Inicializará el formulario</li>
   *      <li>Si el usuario fue redirigido al Login desde SignUp, se inicializará el mensaje de éxito</li>
   *  </ul>
    */
  ngOnInit(): void {
    this.processMessageTranslation(this.getMessages());
    this.infoMessage = this.getMessages();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.processMessageTranslation(this.getMessages());
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  /**
   * Método que traduce textos.
   * @param messages
   * Los textos a traducir.
   */
  processMessageTranslation(messages): void {
    this.infoMessage = [];
    for (let message of messages){
      var mAux = message;
      mAux.summary = this.translateService.instant("sign_up_successful_message_summary");
      mAux.detail = this.translateService.instant("sign_up_successful_message_detail");
      this.infoMessage.push(mAux);
    }
  }

  /**
   * Métódo que obtiene mensajes de notificación a través del servicio.
   */
  getMessages(): Message[] {
    return this.notification.message;
  }

  /**
   * Método que crea un objeto user a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado y si las credenciales son correctas, también será el encargado de redirigir al usuario al componente correspondiente según su rol.
   * En caso contrario, se mostrará un error al usuario.
   */
  onSubmit() {
    const usuario = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(usuario).subscribe(data => {
        this.localStorageService.setToken(data.token);
        this.isLoginFail = false;
        this.roles = this.localStorageService.getRolesUser();
        if (this.roles.includes("ROLE_ADMIN")){
          this.router.navigate(['/user']);
        }
        else{
          this.router.navigate(['/recommendationMap']);
        }
      },
      (err: any) => {
        this.isLoginFail = true;
      });
  }

  /**
   * Método que se ejecuta al destruir un componente.
   */
  ngOnDestroy() {
    this.notification.message = [];
  }
}
