import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {forkJoin} from 'rxjs';
import {InterestService} from '../services/interest/interest.service';
import {ActivityService} from '../services/activity/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as L from 'leaflet';
import {DomSanitizer} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-edit-activities',
  templateUrl: './edit-activities.component.html',
  styleUrls: ['./edit-activities.component.scss']
})
/**
 * Clase EditActivitiesComponent
 *
 * Clase que permite editar la información de una actividad.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class EditActivitiesComponent implements OnInit {

  /**
   * Formulario para editar la información de una actividad.
   */
  editActivitiesForm: FormGroup;
  /**
   * Array de objetos SelectItem para almacenar las distintas opciones del componente dropdown de intereses.
   */
  interest: SelectItem[];
  /**
   * Almacena el id de la actividad seleccionada para editar.
   */
  activityId;
  /**
   * Almacena la actividad seleccionada para editar.
   */
  activity;
  /**
   * Almacena el archivo imagen.
   */
  file;
  /**
   * Almacena la url de la imagen saneada.
   */
  image;
  /**
   * Indica si el formulario tiene algún cambio o no.
   */
  valueUnchanged: boolean = true;
  /**
   * Almacena el mensaje que se muestra al usuario.
   */
  infoMessage = [];

  /**
   * Constructor de la clase EditActivitiesComponent
   *
   * @param fb
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param interestService
   * Servicio de intereses
   * @param activityService
   * Servicio de actividades
   * @param activatedRoute
   * Proporciona acceso a la información sobre una ruta asociada a un componente que se carga.
   * @param router
   * Servicio que permite la navegación entre vistas
   * @param sanitizer
   * Ayuda a prevenir los fallos de seguridad de Cross Site Scripting (XSS) saneando los valores para que sean seguros de usar en los diferentes contextos del DOM
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   */
  constructor(
    private fb: FormBuilder,
    private interestService: InterestService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private translateService: TranslateService,
    private messageService: MessageService
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   *  <ul>
   *      <li>El id de la actividad.</li>
   *      <li>Inicializará el formulario con los datos de la actividad.</li>
   *      <li>Creará el mapa con el correspondiente marcador.</li>
   *      <li>Cargará los dintintos intereses y la información de la actividad.</li>
   *      <li>Saneará la URL de la imagen asociada a la actividad.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id');

    this.editActivitiesForm = this.fb.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]],
      description: ['', [Validators.required, validadorNonwhiteSpace()]],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required],
      interest: ['', Validators.required],
      address: ['', Validators.required]
    });

    forkJoin([
      this.interestService.getInterests(),
      this.activityService.getActivity(this.activityId)
    ]).subscribe(([response1, response2]) => {
      this.interest = [];
      response1.forEach( i => {
        this.interest.push({label: i.nameInterest, value: i.nameInterest});
      });
      this.activity = response2;
      this.editActivitiesForm.patchValue(
        {
          name: response2.name,
          description: response2.description,
          latitude: response2.latitude,
          longitude: response2.longitude,
          city: response2.city,
          interest: response2.interest,
          address: response2.address
        }
      );

      var map = L.map('mapActivityEdit').setView([response2.latitude, response2.longitude], 8);

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      var opciones = {
        placeholder: "Escriba la dirección...",
        errorMessage: "No se han encontrado direcciones",
      };

      var control = L.Control.geocoder(opciones).on('markgeocode', function (e) {

        var latitud = e.geocode.center.lat;
        this.editActivitiesForm.controls['latitude'].setValue(latitud);

        var longitud = e.geocode.center.lng;
        this.editActivitiesForm.controls['longitude'].setValue(longitud);

        var council = e.geocode.properties.address.city || e.geocode.properties.address.town || e.geocode.properties.address.village;
        console.log(council);
        this.editActivitiesForm.controls['city'].setValue(council);

        this.editActivitiesForm.controls['address'].setValue(e.geocode.name);
      }.bind(this)).addTo(map);

      control.options.geocoder.geocode(response2.address, function(results) {
          var resultado = results[0];
          if (resultado)
            control.markGeocode(resultado);
        }
      );

      var url = 'data:' + this.activity.metadataImage.mimeType + ';base64,' + this.activity.metadataImage.data;
      this.image = this.sanitizer.bypassSecurityTrustUrl(url);

      this.file = this.dataURItoBlob(url, this.activity.pathImage);

      this.observeChanges();
    });
  }

  /**
   * Método que convierte la información codificada en base64 en un objeto File.
   * @param dataURI
   * Url con la información codificada en base64
   * @param fileName
   * Nombre del archivo
   */
  dataURItoBlob(dataURI: any, fileName: string): File{

    // convert base64/URLEncoded data component to a file
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new File([ia], fileName, {type: mimeString});
  }

  /**
   * Método que se ejecuta cuando algún valor del formulario cambia.
   */
  observeChanges() {
    this.editActivitiesForm.valueChanges.subscribe((values) => {
      this.isEquivalent(this.activity, values);
    });
  }

  /**
   * Método que compara dos objetos JSON. Devuelve true si son iguales y false en caso contrario.
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
      if (a[propName] !== b[propName]) {
        this.valueUnchanged = false;
        return false;
      }
    }
  }

  /**
   * Método que crea un objeto FormData a partir de los datos del formulario y se lo envía a la API.
   * Una vez enviado, también será el encargado de redirigir al usuario al componente TableActivities y de mostrar un mensaje al usuario.
   */
  editActivity(){
    const formData = new FormData();
    formData.append('image', this.file);
    formData.append('name', this.editActivitiesForm.get('name').value);
    formData.append('description', this.editActivitiesForm.get('description').value);
    formData.append('latitude', this.editActivitiesForm.get('latitude').value);
    formData.append('longitude', this.editActivitiesForm.get('longitude').value);
    formData.append('city', this.editActivitiesForm.get('city').value);
    formData.append('interest', this.editActivitiesForm.get('interest').value);
    formData.append('address', this.editActivitiesForm.get('address').value);

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

    this.activityService.editActivity(this.activityId, formData).subscribe(
      data => {

        var message = this.translateService.instant('activity_edit_message',{ 'nameActivity': this.editActivitiesForm.get('name').value });
        this.messageService.add({key: 'activity_edited', severity: 'success', summary: this.translateService.instant('activity_edit'), detail: message});

        setTimeout(() => {
          this.router.navigate(['/activities']);
        }, 1500);
      },
      err => {
        if (err.error.mensaje === "La ciudad no existe"){
          var message = this.translateService.instant('error_locality');
          this.infoMessage = [
            {
              key: 'edit_activity_error',
              severity: 'error',
              summary: this.translateService.instant('error'),
              detail: message,
              keyTranslate: 'error_locality'
            }
          ];
        }
        else if (err.error.mensaje.includes("Ya hay una actividad con ese nombre")) {
          var message = this.translateService.instant('error_activity_repeated');
          this.infoMessage = [
            {
              key: 'edit_activity_error',
              severity: 'error',
              summary: this.translateService.instant('error'),
              detail: message,
              keyTranslate: 'error_activity_repeated'
            }
          ];
        }
      }
    );
  }

  /**
   * Método que cambia dinámicamente el src de una etiqueta img en el DOM
   * @param event
   * Evento que se produce cuando un archivo es seleccionado.
   */
  changeImage(event){
    if (event.files[0]){
      var src = URL.createObjectURL(event.files[0]);
      var preview = document.getElementById("image-edit-activity").setAttribute( 'src', src);
      this.file = event.files[0];
      this.valueUnchanged = false;
    }
  }

  /**
   * Método que deshabilita el botón enviar cuando el usuario elimina el archivo imagen del campo de selección de ficheros.
   * @param event
   * Evento que se produce cuando un archivo es eliminado utilizando el botón correspondiente.
   */
  deleteFiles(event){
    this.valueUnchanged = true;
    var url = 'data:' + this.activity.metadataImage.mimeType + ';base64,' + this.activity.metadataImage.data;
    this.image = this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
