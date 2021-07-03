import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {AuthService} from '../services/auth/auth.service';
import {validadorPasswordSame} from '../validators/validatorPasswordSame.directive';
import {validadorAgeGreaterThan} from '../validators/validatorGreaterThan.directive';
import {Router} from '@angular/router';
import {NotificationService} from '../services/message/notification.service';
import {validadorPriorityNumberOfInterest} from '../validators/validatorPriorityNumber.directive';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
/**
 * Clase SignUpComponent.
 *
 * Clase que permite el registro de un usuario.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class SignUpComponent implements OnInit {
  /**
   * Formulario para registrar a un usuario.
   */
  formGroup: FormGroup;
  /**
   * Array de objetos Interest para almacenar los distintos intereses.
   */
  interestArray;
  /**
   * Indica si el registro falló.
   */
  isRegisterFail = false;
  /**
   * Indica que la primera parte del formulario es correcta y visualiza el segundo bloque.
   */
  openSecondForm = false;
  /**
   * Indica que en la primera parte del formulario hay algún error e impide visualizar el segundo bloque.
   */
  isContinueFail = false;
  /**
   * Almacena el mensaje de error devuelto por la API.
   */
  message;

  /**
   * Constructor de la clase SignUpComponent.
   *
   * @param formBuilder
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param interestService
   * Servicio de intereses.
   * @param authService
   * Servicio de autenticación.
   * @param router
   * Servicio que permite la navegación entre vistas.
   * @param notificationService
   * Servicio que permite almacenar notificaciones.
   */
  constructor(
    private formBuilder: FormBuilder,
    private interestService: InterestService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>Inicializará el formulario.</li>
   *      <li>Cargará los dintintos intereses.</li>
   *  </ul>
   */
  ngOnInit(): void {
    const minPassLength = 7;
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirthday: ['', [Validators.required, validadorAgeGreaterThan()]],
      password: ['', [Validators.required, Validators.minLength(minPassLength)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(minPassLength)]],
      interest: new FormArray([])
    },
      {
        validators: validadorPasswordSame()
      });
    this.loadInterest();

    // Podría sobrar si actualizo a Angular 11 (no sé si lo necesito)
    this.formGroup.valueChanges.subscribe(e => {
      this.formGroup.setValue(e, {emitEvent: false});
    });
  }

  /**
   * Método que obtiene el array de intereses del formulario.
   */
  get interest(): FormArray {
    return this.formGroup.get('interest') as FormArray;
  }

  /**
   * Método que obtiene los intereses de la API y los almacena.
   */
  loadInterest() {
    this.interestService.getInterests().subscribe(data => {
        this.interestArray = data;
        this.interestArray.forEach(interest => {
          const control = new FormGroup({
            nameInterest: new FormControl(interest.nameInterest, Validators.required),
            priority: new FormControl(0, [Validators.required, validadorPriorityNumberOfInterest()])
          });
          this.interest.push(control);
        });
      },
      err => {
        console.log(err);
      });
  }

  /**
   * Método que crea un objeto user a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de redirigir al usuario al componente Login y de mostrar un mensaje al usuario.
   */
  onSubmit() {
    var dateBirthday = new Date(this.formGroup.get('dateBirthday').value);
    const offset = dateBirthday.getTimezoneOffset()
    dateBirthday = new Date(dateBirthday.getTime() - (offset * 60 * 1000))
    const user = {
      userName: this.formGroup.get('name').value,
      email: this.formGroup.get('email').value,
      dateBirthday: dateBirthday.toISOString().split('T')[0],
      password: this.formGroup.get('password').value,
      passwordConfirm: this.formGroup.get('repeatPassword').value,
      roles: ['user'],
      interest: this.interest.value
    };
    this.authService.signUp(user).subscribe(
      data => {
        this.isRegisterFail = false;
        this.notificationService.success("sign_up_successful_message_detail", "sign_up_successful_message_summary");
        this.router.navigate(['login']);
      },
      (err) => {
        this.isRegisterFail = true;
        this.message = err.error.mensaje;
      });
  }

  /**
   * Método que muestra al usuario el segundo bloque del formulario.
   */
  continueSecondPartForm(){
    if (this.formGroup.get('name').valid && this.formGroup.get('email').valid && this.formGroup.get('dateBirthday').valid &&
      this.formGroup.get('password').valid && this.formGroup.get('repeatPassword').valid){
      this.openSecondForm = true;
      this.isContinueFail = false;
    }
    else{
      this.isContinueFail = true;
    }
  }

  /**
   * Método que permite al usuario regresar al primer bloque del formulario.
   */
  returnFirstPartForm(){
    this.openSecondForm = false;
  }
}
