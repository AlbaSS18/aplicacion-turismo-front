import { Component, OnInit } from '@angular/core';
import {CityService} from '../services/city/city.service';
import {City} from '../models/city';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
/**
 * Clase ListCitiesComponent
 *
 * Clase que muestra la lista de localidades.
 */
export class ListCitiesComponent implements OnInit {

  /**
   * Almacena las localidades.
   */
  cities: City[];
  /**
   * Indica si el usuario quiere añadir una nueva localidad.
   */
  display: boolean = false;
  /**
   * Formulario para añadir una localidad.
   */
  formAddCity: FormGroup;
  /**
   * Indica si se ha producido algún error al añadir una nueva localidad.
   */
  errorAddCity: boolean = false;
  /**
   * Indica si se ha producido algún error al modificar la información de una localidad.
   */
  errorEditCity: boolean = false;
  /**
   * Indica si el usuario ha selecciona alguna localidad para editar.
   */
  displayEditPanel: boolean = false;
  /**
   * Formulario para editar la información de una localidad.
   */
  formEditCity: FormGroup;

  /**
   * Constructor de la clase ListCitiesComponent
   * @param cityService
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
    private cityService: CityService,
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
    this.formAddCity = this.formBuilder.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.formEditCity = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.loadCities();
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
  loadCities(){
    this.cityService.getCities().subscribe(
      (data) => {
        this.cities = data;
      }
    );
  }

  /**
   * Método que crea un objeto city a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de resetear el formulario y de mostrar un mensaje al usuario.
   */
  onSubmit(){
    var city = {
      name: this.formAddCity.get('name').value
    };
    this.cityService.addCity(city).pipe(
      mergeMap( message => {
        return this.cityService.getCities().pipe(
          map(data => {
            this.cities = data;
          })
        );
      })
    ).subscribe( data => {
        var message = this.translateService.instant('city_add_message',{ 'nameCity': this.formAddCity.get('name').value });
        this.display = false;
        this.formAddCity.reset();
        this.messageService.add({key: 'city', severity:'success', summary: this.translateService.instant('city_add'), detail: message });
      },
      err => {
        this.errorAddCity = true;
      }
    );
  }

  /**
   * Método que elimina una localidad del sistema a través de la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   * @param city
   * Localidad que se desea eliminar
   */
  removeCity(city){
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_city'),
      accept: () => {
        this.cityService.deleteCity(city).pipe(
          mergeMap( message => {
            return this.cityService.getCities().pipe(
              map(data => {
                this.cities = data;
              })
            );
          })
        ).subscribe( data => {
            var message = this.translateService.instant('city_delete_message',{ 'nameCity': city.name });
            this.messageService.add({key: 'city', severity:'success', summary: this.translateService.instant('city_delete'), detail: message });
          },
          (err) => {
            if (err.status === 500){
              var message = this.translateService.instant('city_has_activities');
              this.messageService.add({key: 'city', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
            else{
              var message = this.translateService.instant('error_delete_message');
              this.messageService.add({key: 'city', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
          }
        );
      }
    });
  }

  /**
   * Método que se invoca cuando el diálogo que se utiliza para añadir una nueva localidad, se oculta.
   */
  hideDialogCity(){
    this.formAddCity.reset();
    this.errorAddCity = false;
  }

  /**
   * Método que se invoca cuando el diálogo que se utiliza para modificar la información de una localidad, se oculta.
   */
  hideDialogEditCity(){
    this.errorEditCity = false;
  }

  /**
   * Método que se invoca cuando el usuario cancela la opción de añadir una nueva localidad.
   */
  cancel(){
    this.display = false;
  }

  /**
   * Método que muestra el diálogo para editar la información de una localidad.
   * @param city
   * Localidad cuya información se desea modificar.
   */
  editCity(city){
    this.displayEditPanel = true;
    this.formEditCity.patchValue({
        id: city.id,
        name : city.name
      }
    );
  }

  /**
   * Método que crea un objeto city a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   */
  onEditSubmit(){
    var city = {
      name : this.formEditCity.get('name').value
    };

    this.cityService.editCity(this.formEditCity.get('id').value, city).pipe(
      mergeMap(message => {
        return this.cityService.getCities().pipe();
      })
    ).subscribe( data => {
      this.displayEditPanel = false;
      var message = this.translateService.instant('city_edit_message',{ 'nameCity': city.name });
      this.messageService.add({key: 'city', severity:'success', summary: this.translateService.instant('city_edit'), detail: message });
      this.cities = data;
    },
      err => {
        this.errorEditCity = true;
      });
  }

  /**
   * Método que se invoca cuando el usuario cancela la opción de modificar la información de una localidad.
   */
  cancelEdit(){
    this.displayEditPanel = false;
  }


}
