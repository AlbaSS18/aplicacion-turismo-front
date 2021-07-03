import { Component, OnInit } from '@angular/core';
import {LocalityService} from '../services/locality/locality.service';
import {Locality} from '../models/locality';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {map, mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-list-locaties',
  templateUrl: './list-localities.component.html',
  styleUrls: ['./list-localities.component.scss']
})
/**
 * Clase ListLocalitiesComponent.
 *
 * Clase que muestra la lista de localidades.
 */
export class ListLocalitiesComponent implements OnInit {

  /**
   * Almacena las localidades.
   */
  localities: Locality[];
  /**
   * Indica si el usuario quiere añadir una nueva localidad.
   */
  display: boolean = false;
  /**
   * Formulario para añadir una localidad.
   */
  formAddLocality: FormGroup;
  /**
   * Indica si se ha producido algún error al añadir una nueva localidad.
   */
  errorAddLocality: boolean = false;
  /**
   * Indica si se ha producido algún error al modificar la información de una localidad.
   */
  errorEditLocality: boolean = false;
  /**
   * Indica si el usuario ha selecciona alguna localidad para editar.
   */
  displayEditPanel: boolean = false;
  /**
   * Formulario para editar la información de una localidad.
   */
  formEditLocality: FormGroup;

  /**
   * Constructor de la clase ListLocalitiesComponent.
   * @param localityService
   * Servicio de localidades.
   * @param formBuilder
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param confirmationService
   * Servicio propocionado por la librería PrimeNG que permite mostrar un diálogo de confirmación.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   */
  constructor(
    private localityService: LocalityService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private messageService: MessageService
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>Inicializará el formulario para añadir una localidad y para editar un interés.</li>
   *      <li>Cargará las distintas localidades.</li>
   * </ul>
   */
  ngOnInit(): void {
    this.formAddLocality = this.formBuilder.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.formEditLocality = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.loadLocalities();
  }

  /**
   * Método que muestra el diálogo para añadir una nueva localidad.
   * @param $event
   * Evento que se produce cuando el usuario quiere añadir una nueva localidad.
   */
  openPanel($event){
    this.display = true;
  }

  /**
   * Método que obtiene las localidades de la API y los almacena.
   */
  loadLocalities(){
    this.localityService.getLocalities().subscribe(
      (data) => {
        this.localities = data;
      }
    );
  }

  /**
   * Método que crea un objeto locality a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de resetear el formulario y de mostrar un mensaje al usuario.
   */
  onSubmit(){
    var locality = {
      name: this.formAddLocality.get('name').value
    };
    this.localityService.addLocality(locality).pipe(
      mergeMap( message => {
        return this.localityService.getLocalities().pipe(
          map(data => {
            this.localities = data;
          })
        );
      })
    ).subscribe( data => {
        var message = this.translateService.instant('locality_add_message',{ 'nameLocality': this.formAddLocality.get('name').value });
        this.display = false;
        this.formAddLocality.reset();
        this.messageService.add({key: 'locality', severity:'success', summary: this.translateService.instant('locality_add'), detail: message });
      },
      err => {
        this.errorAddLocality = true;
      }
    );
  }

  /**
   * Método que elimina una localidad del sistema a través de la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   * @param locality
   * Localidad que se desea eliminar.
   */
  removeLocality(locality){
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_locality'),
      accept: () => {
        this.localityService.deleteLocality(locality).pipe(
          mergeMap( message => {
            return this.localityService.getLocalities().pipe(
              map(data => {
                this.localities = data;
              })
            );
          })
        ).subscribe( data => {
            var message = this.translateService.instant('locality_delete_message',{ 'nameLocality': locality.name });
            this.messageService.add({key: 'locality', severity:'success', summary: this.translateService.instant('locality_delete'), detail: message });
          },
          (err) => {
            if (err.status === 500){
              var message = this.translateService.instant('locality_has_activities');
              this.messageService.add({key: 'locality', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
            else{
              var message = this.translateService.instant('error_delete_message');
              this.messageService.add({key: 'locality', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
          }
        );
      }
    });
  }

  /**
   * Método que se invoca cuando el diálogo que se utiliza para añadir una nueva localidad, se oculta.
   */
  hideDialogLocality(){
    this.formAddLocality.reset();
    this.errorAddLocality = false;
  }

  /**
   * Método que se invoca cuando el diálogo que se utiliza para modificar la información de una localidad, se oculta.
   */
  hideDialogEditLocality(){
    this.errorEditLocality = false;
  }

  /**
   * Método que se invoca cuando el usuario cancela la opción de añadir una nueva localidad.
   */
  cancel(){
    this.display = false;
  }

  /**
   * Método que muestra el diálogo para editar la información de una localidad.
   * @param locality
   * Localidad cuya información se desea modificar.
   */
  editLocality(locality){
    this.displayEditPanel = true;
    this.formEditLocality.patchValue({
        id: locality.id,
        name : locality.name
      }
    );
  }

  /**
   * Método que crea un objeto locality a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   */
  onEditSubmit(){
    var locality = {
      name : this.formEditLocality.get('name').value
    };

    this.localityService.editLocality(this.formEditLocality.get('id').value, locality).pipe(
      mergeMap(message => {
        return this.localityService.getLocalities().pipe();
      })
    ).subscribe( data => {
      this.displayEditPanel = false;
      var message = this.translateService.instant('locality_edit_message',{ 'nameLocality': locality.name });
      this.messageService.add({key: 'locality', severity:'success', summary: this.translateService.instant('locality_edit'), detail: message });
      this.localities = data;
    },
      err => {
        this.errorEditLocality = true;
      });
  }

  /**
   * Método que se invoca cuando el usuario cancela la opción de modificar la información de una localidad.
   */
  cancelEdit(){
    this.displayEditPanel = false;
  }


}
