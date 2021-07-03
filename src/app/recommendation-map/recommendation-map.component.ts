import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import * as L from 'leaflet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {FilterService} from 'primeng/api';
import {LocalityService} from '../services/locality/locality.service';
import {DomSanitizer} from '@angular/platform-browser';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {ActivityRecommended} from '../models/activity';
import {User} from '../models/user';

@Component({
  selector: 'app-recommendation-map',
  templateUrl: './recommendation-map.component.html',
  styleUrls: ['./recommendation-map.component.scss']
})
/**
 * Clase RecommendationMapComponent.
 *
 * Clase que obtiene las actividades recomendadas al usuario autenticado.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class RecommendationMapComponent implements OnInit {

  /**
   * Almacena las actividades recomendadas.
   */
  activitiesRecommendation: ActivityRecommended[];
  /**
   * Almacena la lista de actividades que se muestran en el mapa.
   */
  activitiesSelected: string[] = [];
  /**
   * Mapa.
   */
  map;
  /**
   * Array que almacena la lista de marcadores del mapa.
   */
  markerList = [];
  /**
   * Indica si el usuario ha seleccionado alguna actividad para valorar.
   */
  displayPanelRating: boolean = false;
  /**
   * Formulario para valorar una actividad.
   */
  formToRatingActivity: FormGroup;
  /**
   * Almacena la actividad que el usuario quiere valorar.
   */
  activitySelectedToRate: ActivityRecommended;
  /**
   * Almacena el usuario autenticado.
   */
  userLogged: User;

  /**
   * Constructor de la clase RecommendationMapComponent.
   * @param activitiesService
   * Servicio de actividades.
   * @param fb
   * Clase que permite crear objetos de la clase FormGroup y FormControl.
   * @param interestService
   * Servicio de intereses.
   * @param localityService
   * Servicio de localidades.
   * @param sanitizer
   * Ayuda a prevenir los fallos de seguridad de Cross Site Scripting (XSS) saneando los valores para que sean seguros de usar en los diferentes contextos del DOM.
   * @param filterService
   * Servicio propocionado por la librería PrimeNG que permite acceder a la API para registrar filtros personalizados.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   * @param userService
     Servicio de usuarios.
   */
  constructor(
    private activitiesService: ActivityService,
    private fb: FormBuilder,
    private interestService: InterestService,
    private localityService: LocalityService,
    private sanitizer: DomSanitizer,
    private filterService: FilterService,
    private localStorageService: LocalStorageService,
    private userService: UserService) {
    this.formToRatingActivity = this.fb.group({
      rating: ['', Validators.required],
    });
  }

  /**
   * Método que permite inicializar los datos del componente.
   *  <ul>
   *      <li>Creará el mapa con los correspondientes marcadores.</li>
   *      <li>Cargará las actividades recomendadas al usuario autenticado.</li>
   *  </ul>
   */
  ngOnInit(): void {

    this.map = L.map('mapActivityRecommendation', {
      center: [ 43.333333, -5.826187 ],
      zoom: 8.75,
      zoomSnap: 0.25
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.localStorageService.getEmailUser())),
      mergeMap ( user => {
        this.userLogged = user[0];
        return forkJoin([this.activitiesService.getRecommendedActivities(user[0].id)]).pipe();
      })
    ).subscribe(
      ([response1]) => {
        this.activitiesRecommendation = response1;

        this.activitiesRecommendation.forEach(activity => {
          this.activitiesSelected.push(activity.name);

          var greenIcon = L.icon({
            iconUrl: '../../assets/images/landscape.png',
            iconSize: [35, 35], // size of the icon
          });

          var photoImg = '<img src="data:' + activity.metadataImage.mimeType  + ';base64,' + activity.metadataImage.data  + '" width="100%" height="100%"/>';

          const popupContent =
            photoImg +
            '<div>' +
            '<h2>' +
            activity.name  +
            '</h2>' + '<div><i class="fas fa-map-marker-alt"></i> ' + activity.address + '</div>' + '<div><i class="fas fa-tags"></i> ' + activity.interest + '</div>'  + '</div>';

          var marker = L.marker([activity.latitude, activity.longitude], {icon: greenIcon}).addTo(this.map).bindPopup(popupContent, {
            maxWidth : 250
          });
          this.markerList.push(marker);
        });

        setTimeout(() => {
          this.map.invalidateSize();
        }, 300);
    });
  }

  /**
   * Método que modifica la aparición de los marcadores en el mapa según la selección del usuario.
   * @param event
   * Evento que se produce cuando el usuario hace click en alguna casilla de verificación.
   * @param activity
   * La actividad cuyo marcador se quiere mostrar o eliminar del mapa.
   */
  changeMap(event, activity){
    if (event.checked){
      var greenIcon = L.icon({
        iconUrl: '../../assets/images/landscape.png',
        iconSize: [35, 35], // size of the icon
      });

      var photoImg = '<img src="data:' + activity.metadataImage.mimeType  + ';base64,' + activity.metadataImage.data  + '" width="100%"/>';

      const popupContent =
        photoImg +
        '<div>' +
        '<h2>' +
        activity.name  +
        '</h2>' + '<div><i class="fas fa-map-marker-alt"></i> ' + activity.address + '</div>' + '<div><i class="fas fa-tags"></i> ' + activity.interest + '</div>'  + '</div>';


      var marker = L.marker([activity.latitude, activity.longitude], {icon: greenIcon}).addTo(this.map).bindPopup(popupContent, {
        maxWidth : 250
      });
      this.markerList.push(marker);
    }
    else{
      this.removeMarkerFromMap(activity);
    }
  }

  /**
   * Método que abre un diálogo para que el usuario autenticado pueda valorar una actividad.
   * @param activity
   * Actividad a valorar.
   */
  openPanelToRating(activity){
    this.formToRatingActivity.patchValue({
      rating: []
    });
    this.activitySelectedToRate = activity;
    this.displayPanelRating = true;
  }

  /**
   * Método que envía una valoración de una actividad recomendada.
   * Una vez enviado, también se encargará de cargar las nuevas recomendaciones y de modificar los marcadores del mapa.
   */
  sendRatingActivity(){
    var rateActivity = {
      activity_id : this.activitySelectedToRate.id,
      email_user: this.localStorageService.getEmailUser(),
      rate: this.formToRatingActivity.get('rating').value
    }

    this.activitiesService.postRateActivity(rateActivity).pipe(
      mergeMap(
        data => {
          this.displayPanelRating = false;
          this.removeMarkerFromMap(this.activitySelectedToRate);
          return this.activitiesService.getRecommendedActivities(this.userLogged.id).pipe();
        }
      )
    ).subscribe(
      data => {
        this.activitiesRecommendation = data;
      }
    );
  }

  /**
   * Método que elimina un marcador del mapa.
   * @param activity
   * Actividad cuyo marcador asociado se quiere eliminar del mapa.
   */
  removeMarkerFromMap(activity){
    var f = this.markerList.filter((act) => {
      return act._latlng.lat === activity.latitude && act._latlng.lng === activity.longitude;
    });
    // NOTE: Puede haber un marcador con la misma longitude y latitude. Cuidado
    if (f.length !== 0){
      const index = this.markerList.indexOf(f[0]);
      if (index > -1) {
        this.markerList.splice(index, 1);
      }
      this.map.removeLayer(f[0]);
    }
  }

  /**
   * Método que sanea la URL de la imagen asociada a la actividad.
   * @param activity
   * Actividad cuya url de la imagen asociada se quiere sanear.
   */
  photoURL(activity){
    var url = 'data:' + activity.metadataImage.mimeType + ';base64,' + activity.metadataImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
