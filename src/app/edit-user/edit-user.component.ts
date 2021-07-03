import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {validadorAgeGreaterThan} from '../validators/validatorGreaterThan.directive';
import {validadorPriorityNumberOfInterest} from '../validators/validatorPriorityNumber.directive';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

/**
 * Clase EditUserComponent.
 *
 * Clase que permite editar la información del usuario autenticado.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  /**
   * Formulario para editar la información del usuario autenticado.
   */
  editUserProfile: FormGroup;
  /**
   * Almacena el usuario.
   */
  user;
  /**
   * Indica si el formulario tiene algún cambio o no.
   */
  valueUnchanged: boolean = true;
  /**
   * Almacena el mensaje que se muestra al usuario.
   */
  infoMessage = [];

  /**
   * Constructor de la clase EditUserComponent.
   *
   * @param userService
   * Servicio de usuarios.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   * @param fb
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   */
  constructor(
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   *
   * <ul>
   *      <li>Inicializará el formulario con los datos del usuario.</li>
   *      <li>Cargará la información del usuario autenticado.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.editUserProfile = this.fb.group({
      dateBirthday: ['', [Validators.required, validadorAgeGreaterThan()]],
      interest: this.fb.array([]),
      userName: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.localStorageService.getEmailUser())),
      mergeMap ( user => {
        return forkJoin([this.userService.getUser(user[0].id)]).pipe();
      })
    ).subscribe(
      ([response1]) => {
        this.user = response1;
        this.editUserProfile.patchValue({
          userName: this.user.userName,
          dateBirthday: new Date(this.user.dateBirthday)
        });
        this.user.interest.forEach(
          infoInterest => {
            var newItem = this.fb.group({
              interestID: [infoInterest.interestID, Validators.required],
              nameInterest: [infoInterest.nameInterest, Validators.required],
              priority: [infoInterest.priority, [Validators.required, validadorPriorityNumberOfInterest()]]
            });
            this.interest.push(newItem);
          }
        )
        this.observeChanges();
      }
    );
  }

  /**
   * Método que obtiene el array de intereses del formulario.
   */
  get interest(): FormArray {
    return this.editUserProfile.get('interest') as FormArray;
  }

  /**
   * Método que crea un objeto usuario y se lo envía a la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   */
  updateUserProfile(){
    var dateBirthday = new Date(this.editUserProfile.get('dateBirthday').value);
    const offset = dateBirthday.getTimezoneOffset()
    dateBirthday = new Date(dateBirthday.getTime() - (offset * 60 * 1000))
    var user = {
      dateBirthday: dateBirthday.toISOString().split('T')[0],
      userName: this.editUserProfile.get("userName").value,
      interest: this.interest.value,
      roles: this.user.roles
    };
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      var aux = this.infoMessage;
      this.infoMessage = [];
      for (let message of aux){
        var mAux = message;
        mAux.summary = this.translateService.instant(mAux.keySummary);
        mAux.detail = this.translateService.instant(mAux.keyDetail);
        this.infoMessage.push(mAux);
      }
    });
    this.userService.editUser(this.user.id, user).pipe(
      map( data => {
        this.valueUnchanged = true;
        var message = this.translateService.instant('user_profile_edit_message');
        this.infoMessage = [
          {key: 'edit_profile_user', severity:'success', summary: this.translateService.instant('user_profile_edit'), detail: message, keySummary: 'user_profile_edit' , keyDetail: 'user_profile_edit_message'}
          ];
      }),
      mergeMap( () => {
        return this.userService.getUser(this.user.id).pipe();
      })
    ).subscribe(
      data => {
        this.user = data;
      },
      (err) => {
        var message = this.translateService.instant('error_delete_message');
        this.infoMessage = [
          { key: 'edit_profile_user', severity:'error', summary: this.translateService.instant('error'), detail: message, keySummary: 'error' , keyDetail: 'error_delete_message'}
        ];
      }
    );
  }

  /**
   * Método que se ejecuta cuando algún valor del formulario cambia.
   */
  observeChanges() {
    this.editUserProfile.valueChanges.subscribe((values) => {
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
      if (propName === "interest"){
        // Sort array
        var array1Sort = a[propName].sort((a, b) => (a.interestID < b.interestID ? -1 : 1));
        var array2Sort = b[propName].sort((a, b) => (a.interestID < b.interestID ? -1 : 1));
        var check = array1Sort.length === array2Sort.length && array1Sort.every((value, index) => JSON.stringify(value) === JSON.stringify(array2Sort[index]));
        if (check === false){
          this.valueUnchanged = check;
          return array1Sort.length === array2Sort.length && array1Sort.every((value, index) => JSON.stringify(value) === JSON.stringify(array2Sort[index]));
        }
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
