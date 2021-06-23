import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {TranslateService} from '@ngx-translate/core';
import {map, mergeMap} from 'rxjs/operators';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {User} from '../models/user';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
/**
 * Clase ListUserComponent
 *
 * Clase que muestra la lista de usuarios registrados en el sistema.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class ListUserComponent implements OnInit {

  /**
   * Almacena los usuarios
   */
  users: User[] = [];
  /**
   * Array de objetos que representan las columnas del componente tabla.
   */
  cols: any[];

  /**
   * Constructor de la clase ListUserComponent
   *
   * @param userService
   * Servicio de usuarios.
   * @param confirmationService
   * Servicio propocionado por la librería PrimeNG que permite mostrar un diálogo de confirmación.
   * @param router
   * Servicio que permite la navegación entre vistas.
   * @param rolService
   * Servicio de roles.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   */
  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rolService: RolService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   *  <ul>
   *      <li>Inicializará los objetos que representan una columna de la tabla.</li>
   *      <li>Cargará los dintintos usuarios.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.cols = [
      { field: 'userName', header: 'username' },
      { field: 'email', header: 'Email' },
      { field: 'dateBirthday', header: 'date_birth' },
      { field: 'roles', header: 'Role'}
    ];
    this.userService.getUsers().subscribe(response => {
      this.users = response.filter(user => user.email !== this.localStorageService.getEmailUser());
    });
  }

  /**
   * Método que elimina un usuario del sistema a través de la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   * @param user
   * Usuario que se desea eliminar.
   */
  confirmDelete(user){
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_user'),
      accept: () => {
        this.userService.deleteUser(user.id).pipe(
          mergeMap( message => {
            return this.userService.getUsers().pipe(
              map(data => {
                this.users = data;
                this.users = this.users.filter(restUser => restUser.email !== this.localStorageService.getEmailUser());
              })
            );
          })
        ).subscribe( data => {
            var message = this.translateService.instant('user_delete_message',{ 'email': user.email });
            this.messageService.add({key: 'user', severity:'success', summary: this.translateService.instant('user_delete'), detail: message });
          },
          (err) => {
            var message = this.translateService.instant('error_delete_message');
            this.messageService.add({key: 'user', severity:'error', summary: this.translateService.instant('error'), detail: message });
          }
        );
      }
    });
  }

  /**
   * Método que redirige al usuario al componente EditUserAdmin.
   * @param user
   * Usuario cuya información se quiere editar.
   */
  editUser(user){
    this.router.navigateByUrl('admin/user/edit/' + user.id);
  }


}
