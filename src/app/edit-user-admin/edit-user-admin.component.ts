import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {User} from '../models/user';
import {Rol} from '../models/rol';
import {UserService} from '../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from 'rxjs';
import {validadorAgeGreaterThan} from '../validators/validatorGreaterThan.directive';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.scss']
})
/**
 * Clase EditUserAdminComponent.
 *
 * Clase que permite editar la información de un usuario.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class EditUserAdminComponent implements OnInit {

  /**
   * Formulario para editar la información de un usuario.
   */
  editUserForm: FormGroup;
  /**
   * Almacena el usuario seleccionado para editar.
   */
  user: User;
  /**
   * Almacena el id del usuario seleccionado para editar.
   */
  userId;
  /**
   * Array de objetos Rol para almacenar los distintos roles.
   */
  roles: Rol[];
  /**
   * Indica si el formulario tiene algún cambio o no.
   */
  valueUnchanged: boolean = true;
  /**
   * Array de objetos SelectItem para almacenar las distintas opciones del componente listbox de roles.
   */
  roleList: SelectItem[];

  /**
   * Constructor de la clase EditUserAdminComponent.
   *
   * @param fb
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param userService
   * Servicio de usuarios.
   * @param activatedRoute
   * Proporciona acceso a la información sobre una ruta asociada a un componente que se carga.
   * @param rolesService
   * Servicio de roles.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param router
   * Servicio que permite la navegación entre vistas.
   */
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private rolesService: RolService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>El id del usuario.</li>
   *      <li>Inicializará el formulario con los datos del usuario.</li>
   *      <li>Cargará los distintos roles y la información del usuario.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editUserForm = this.fb.group({
      userName: ['', [Validators.required, validadorNonwhiteSpace()]],
      dateBirthday: ['', [Validators.required, validadorAgeGreaterThan()]],
      roles: ['', Validators.required]
    });

    forkJoin([this.rolesService.getRoles(), this.userService.getUserForAdmin(this.userId)]).subscribe(results => {
      this.roles = results[0];
      this.user = results[1];
      this.editUserForm.patchValue({
        userName: this.user.userName,
        dateBirthday: new Date(this.user.dateBirthday)
      });
      this.editUserForm.controls['roles'].setValue(this.user.roles);

      this.roleList = this.roles.map((v) => {return {label: v.rolName, value: v.rolName}})

      this.observeChanges();
    });
  }

  /**
   * Método que crea un objeto usuario y se lo envía a la API.
   * Una vez enviado, también será el encargado de redirigir al usuario al componente ListUser y de mostrar un mensaje al usuario.
   */
  sendForm(){
    var dateBirthday = new Date(this.editUserForm.get('dateBirthday').value);
    const offset = dateBirthday.getTimezoneOffset()
    dateBirthday = new Date(dateBirthday.getTime() - (offset * 60 * 1000))

    var user = {
      userName: this.editUserForm.get("userName").value,
      dateBirthday: dateBirthday.toISOString().split('T')[0],
      roles: this.editUserForm.get("roles").value
    };
    this.userService.editUser(this.userId, user).subscribe(
      data => {
        var message = this.translateService.instant('user_edit_message',{ 'nameUser': this.editUserForm.get('userName').value });
        this.messageService.add({key: 'edit-user', severity:'success', summary: this.translateService.instant('user_edit'), detail: message});
        // Para que se muestre el mensaje
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 1500);
      },
      err => {
        var message = this.translateService.instant('error_delete_message');
        this.messageService.add({key: 'edit-user', severity:'error', summary: this.translateService.instant('error'), detail: message});
      }
    );
  }

  /**
   * Método que se ejecuta cuando algún valor del formulario cambia.
   */
  observeChanges() {
    this.editUserForm.valueChanges.subscribe((values) => {
      this.isEquivalent(this.user, values);
    });
  }

  /**
   * Método que compara dos objetos JSON. Devuelve true si son iguales y false en caso contrario.
   *
   * @param a
   * Primer objeto a comparar.
   * @param b
   * Segundo objeto a comparar.
   */
  isEquivalent(a, b) {
    this.valueUnchanged = true;
    var aProps = Object.keys(a);
    var bProps = Object.keys(b);
    for (var i = 0; i < bProps.length; i++) {
      let propName = bProps[i];
      if (propName == "roles"){
        const array2Sorted = b[propName].slice().sort();
        this.valueUnchanged = a[propName].length === b[propName].length && a[propName].slice().sort().every((value, index) => value === array2Sorted[index]);
        return a[propName].length === b[propName].length && a[propName].slice().sort().every((value, index) => value === array2Sorted[index]);
      }
      else if (propName === "dateBirthday"){
        var d1 = new Date(new Date(a[propName]).toDateString());
        var d2 = new Date(b[propName]?.toDateString());
        if (d1.getTime() !== d2.getTime()){
          this.valueUnchanged = false;
          return false;
        }
      }
      else{
        if (a[propName] !== b[propName]) {
          this.valueUnchanged = false;
          return false;
        }
      }
    }
  }


}
