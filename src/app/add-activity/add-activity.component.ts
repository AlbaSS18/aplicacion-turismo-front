import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LocalityService} from '../services/city/locality.service';
import {InterestService} from '../services/interest/interest.service';
import {MessageService, SelectItem} from 'primeng/api';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import {ActivityService} from '../services/activity/activity.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
/**
 * Clase AddActivityComponent.
 *
 * Clase que permite añadir una nueva actividad.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class AddActivityComponent implements OnInit {

  /**
   * Formulario para añadir una actividad.
   */
  formAddActivity: FormGroup;
  /**
   * Array de objetos SelectItem para almacenar las distintas opciones del componente dropdown de intereses.
   */
  interest: SelectItem[];
  /**
   * Almacena el archivo imagen seleccionado por el usuario.
   */
  files = null;
  /**
   * Indica si el usuario ha seleccionado una imagen o la ha eliminado.
   */
  noFiles: boolean = true;
  /**
   * Almacena el mensaje que se muestra al usuario.
   */
  infoMessage = [];

  /**
   * Constructor de la clase AddActivityComponent
   *
   * @param formBuilder
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param cityService
   * Servicio de localidades
   * @param interestService
   * Servicio de intereses
   * @param activityService
   * Servicio de actividades
   * @param router
   * Servicio que permite la navegación entre vistas
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   */
  constructor(
    private formBuilder: FormBuilder,
    private cityService: LocalityService,
    private interestService: InterestService,
    private activityService: ActivityService,
    private router: Router,
    private translateService: TranslateService,
    private messageService: MessageService,
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   *  <ul>
   *      <li>Inicializará el formulario con los campos.</li>
   *      <li>Creará el mapa.</li>
   *      <li>Cargará los distintos intereses.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.formAddActivity = this.formBuilder.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]],
      description: ['', [Validators.required, validadorNonwhiteSpace()]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      city: ['', [Validators.required]],
      nameInterest: ['', [Validators.required]],
      address: ['', Validators.required]
    });

    var map = L.map('mapActivity').setView([43.333333, -6], 8);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var opciones = {
      placeholder: 'Escriba la dirección...',
      errorMessage: 'No se han encontrado direcciones'
    };

    var control = L.Control.geocoder(opciones).on('markgeocode', function (e) {

      var latitud = e.geocode.center.lat;
      this.formAddActivity.controls['latitude'].setValue(latitud);

      var longitud = e.geocode.center.lng;
      this.formAddActivity.controls['longitude'].setValue(longitud);

      var council = e.geocode.properties.address.city || e.geocode.properties.address.town || e.geocode.properties.address.village;
      this.formAddActivity.controls['city'].setValue(council);

      this.formAddActivity.controls['address'].setValue(e.geocode.name);
    }.bind(this)).addTo(map);

    this.loadInterest();
  }

  /**
   * Método que obtiene los intereses de la API y los almacena.
   */
  loadInterest(){
    this.interestService.getInterests().subscribe(
      data => {
        this.interest = [];
        this.interest.push({label: 'Selecciona interés', value: null});
        data.forEach( i => {
          this.interest.push({label: i.nameInterest, value: i.nameInterest});
        });
      }
    );
  }

  /**
   * Método que guarda en una variable el archivo seleccionado.
   *
   * @param event
   * Evento que se produce cuando un archivo es seleccionado.
   */
  dealWithFiles(event){
    this.files = event.files[0];
    this.noFiles = false;
  }

  /**
   * Método que deshabilita el botón enviar cuando el usuario elimina el archivo imagen del campo de selección de ficheros.
   *
   * @param event
   * Evento que se produce cuando un archivo es eliminado utilizando el botón correspondiente.
   */
  deleteFiles(event){
    this.files = null;
    this.noFiles = true;
  }

  /**
   * Método que crea un objeto FormData a partir de los datos introducidos en el formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de redirigir al usuario al component TableActivities y de mostrar un mensaje al usuario.
   */
  addActivity(){
    if (this.files !== null && this.formAddActivity.valid){
      const formData = new FormData();
      formData.append('image', this.files);
      formData.append('name', this.formAddActivity.get('name').value);
      formData.append('description', this.formAddActivity.get('description').value);
      formData.append('latitude', this.formAddActivity.get('latitude').value);
      formData.append('longitude', this.formAddActivity.get('longitude').value);
      formData.append('city', this.formAddActivity.get('city').value);
      formData.append('interest', this.formAddActivity.get('nameInterest').value);
      formData.append('address', this.formAddActivity.get('address').value);

      this.translateService.onLangChange.subscribe(event => {
        var aux = this.infoMessage;
        this.infoMessage = [];
        for (let message of aux){
          var mAux = message;
          mAux.summary = this.translateService.instant("error");
          mAux.detail = this.translateService.instant(message.keyTranslate);
          this.infoMessage.push(mAux);
        }
      });

      this.activityService.addActivity(formData).subscribe(
        data => {

          var message = this.translateService.instant('activity_add_message',{ 'nameActivity': this.formAddActivity.get('name').value });
          this.messageService.add({key: 'activity_added', severity: 'success', summary: this.translateService.instant('activity_add'), detail:message});

          setTimeout(() => {
            this.router.navigate(['/activities']);
          }, 1500);
        },
        err => {
          if (err.error.mensaje === "La ciudad no existe"){
            var message = this.translateService.instant('error_locality');
            this.infoMessage = [
              { key: 'add_activity_error', severity:'error', summary: this.translateService.instant('error'), detail: message, keyTranslate: 'error_locality'}
            ];
          }
          else if (err.error.mensaje.includes("Ya existe una actividad con el nombre")){
            var message = this.translateService.instant('error_activity_repeated');
            this.infoMessage = [
              { key: 'add_activity_error', severity:'error', summary: this.translateService.instant('error'), detail: message, keyTranslate: 'error_activity_repeated'}
            ];
          }
        }
      );
    }
  }

}
