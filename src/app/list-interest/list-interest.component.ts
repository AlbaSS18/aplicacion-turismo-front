import { Component, OnInit } from '@angular/core';
import {InterestService} from '../services/interest/interest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {map, mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-list-interest',
  templateUrl: './list-interest.component.html',
  styleUrls: ['./list-interest.component.scss']
})
/**
 * Clase ListInterestComponent.
 * 
 * Clase que muestra la lista de intereses.
 */
export class ListInterestComponent implements OnInit {

  /**
   * Almacena los intereses.
   */
  interest;
  /**
   * Indica si el usuario quiere añadir un nuevo interés.
   */
  display: boolean = false;
  /**
   * Formulario para añadir un interés.
   */
  formAddInterest: FormGroup;
  /**
   * Indica si se ha producido algún error al añadir un nuevo interés.
   */
  errorAddInterest: boolean = false;
  /**
   * Indica si el usuario ha seleccionado algún interés para editar.
   */
  displayEditDialog: boolean = false;
  /**
   * Formulario para editar la información de un interés.
   */
  formEditInterest: FormGroup;
  /**
   * Indica si se ha producido algún error al modificar la información de un interés.
   */
  errorEditInterest: boolean = false;

  /**
   * Constructor de la clase ListInterestComponent.
   *
   * @param interestService
   * Servicio de intereses.
   * @param formBuilder
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param confirmationService
   * Servicio propocionado por la librería PrimeNG que permite mostrar un diálogo de confirmación.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   */
  constructor(
    private interestService: InterestService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>Inicializará el formulario para añadir un interés y para editar un interés.</li>
   *      <li>Cargará los dintintos intereses.</li>
   * </ul>
   */
  ngOnInit(): void {
    this.formAddInterest = this.formBuilder.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.formEditInterest = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.loadInterest();
  }

  /**
   * Método que obtiene los intereses de la API y los almacena.
   */
  loadInterest(){
    this.interestService.getInterests().subscribe(
      data => {
        this.interest = data;
      }
    );
  }

  /**
   * Método que muestra el diálogo para añadir un nuevo interés.
   * @param $event
   * Evento que se produce cuando el usuario quiere añadir un nuevo interés.
   */
  openPanel($event){
    this.display = true;
  }

  /**
   * Método que crea un objeto interest a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de resetear el formulario y de mostrar un mensaje al usuario.
   */
  onSubmit(){
    var interest = {
      nameInterest: this.formAddInterest.get('name').value
    };
    this.interestService.addInterests(interest).pipe(
      mergeMap( message => {
        return this.interestService.getInterests().pipe(
          map(data => {
            this.interest = data;
          })
        );
      })
    ).subscribe( data => {
        var message = this.translateService.instant('interest_add_message',{ 'nameInterest': this.formAddInterest.get('name').value });
        this.display = false;
        this.formAddInterest.reset();
        this.messageService.add({key: 'interest', severity:'success', summary: this.translateService.instant('interest_add'), detail: message });
      },
      err => {
        this.errorAddInterest = true;
      }
    );
  }

  /**
   * Método que se invoca cuando el diálogo que se utiliza para añadir un nuevo interés, se oculta.
   */
  hideDialogInterest(){
    this.formAddInterest.reset();
    this.errorAddInterest = false;
  }

  /**
   * Método que se invoca cuando el usuario cancela la opción de añadir un nuevo interés.
   */
  cancel(){
    this.display = false;
  }

  /**
   * Método que elimina un interés del sistema a través de la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   * @param interest
   * Interés que se desea eliminar
   */
  deleteInterest(interest) {
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_interest'),
      accept: () => {
        this.interestService.deleteInterest(interest).pipe(
          mergeMap( message => {
            return this.interestService.getInterests().pipe(
              map(data => {
                this.interest = data;
              })
            );
          })
        ).subscribe( data => {
          var message = this.translateService.instant('interest_delete_message',{ 'nameInterest': interest.nameInterest });
          this.messageService.add({key: 'interest', severity:'success', summary: this.translateService.instant('interest_delete'), detail: message });
          },
          (err) => {
            if (err.status === 500){
              var message = this.translateService.instant('interest_has_activities');
              this.messageService.add({key: 'interest', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
            else{
              var message = this.translateService.instant('error_delete_message');
              this.messageService.add({key: 'interest', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
          }
        );
      }
    });
  }

  /**
   * Método que muestra el diálogo para editar la información de una localidad.
   * @param interest
   * Interés cuya información se desea modificar.
   */
  editInterest(interest){
    this.displayEditDialog = true;
    this.formEditInterest.patchValue({
      id: interest.id,
      name: interest.nameInterest
    });
  }

  /**
   * Método que crea un objeto interest a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   */
  onEditSubmit(){
    var interest = {
      nameInterest: this.formEditInterest.get('name').value
    }
    this.interestService.editInterest(this.formEditInterest.get('id').value, interest).pipe(
      mergeMap( data => {
        return this.interestService.getInterests().pipe();
      })
    ).subscribe(
      data => {
        this.displayEditDialog = false;
        var message = this.translateService.instant('interest_edit_message',{ 'nameInterest': interest.nameInterest });
        this.messageService.add({key: 'interest', severity:'success', summary: this.translateService.instant('interest_edit'), detail: message });
        this.interest = data;
      },
      err => {
        this.errorEditInterest = true;
      }
    );
  }

  /**
   * Método que se invoca cuando el usuario cancela la opción de modificar la información de un interés.
   */
  cancelEdit(){
    this.displayEditDialog = false;
  }

  /**
   * Método que se invoca cuando el diálogo que se utiliza para modificar la información de un interés, se oculta.
   */
  hideDialogEditInterest(){
    this.errorEditInterest = false;
  }


}
