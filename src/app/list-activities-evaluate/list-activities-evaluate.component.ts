import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {ActivityRecommended} from '../models/activity';
import {UserService} from '../services/user/user.service';
import {ActivityService} from '../services/activity/activity.service';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list-activities-evaluate',
  templateUrl: './list-activities-evaluate.component.html',
  styleUrls: ['./list-activities-evaluate.component.scss']
})
/**
 * Clase ListActivitiesEvaluateComponent
 *
 * Clase que permite visualizar la lista de actividades valoradas por el usuario autenticado.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class ListActivitiesEvaluateComponent implements OnInit {

  /**
   * Almacena las actividades valoradas por el usuario autenticado.
   */
  listActivities: ActivityRecommended[];
  /**
   * Almacena las opciones para ordenar.
   */
  sortOptions: SelectItem[];
  /**
   * Indica el orden seleccionado por el usuario. Tendrá dos posibles valores: -1 y 1.
   */
  sortOrder: number;
  /**
   * Almacena el campo por el que se tiene que ordenar la información.
   */
  sortField: string;

  /**
   * Constructor de la clase ListActivitiesEvaluateComponent
   *
   * @param userService
   * Servicio de usuarios.
   * @param activityService
   * Servicio de actividades.
   * @param localStorageService
   * Servicio que consta de métodos para acceder al objeto LocalStorage del navegador.
   * @param sanitizer
   * Ayuda a prevenir los fallos de seguridad de Cross Site Scripting (XSS) saneando los valores para que sean seguros de usar en los diferentes contextos del DOM
   */
  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>Inicializará las opciones del dropdown para ordenar las actividades por valoración.</li>
   *      <li>Cargará la lista de actividades valoradas por el usuario autenticado.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.sortOptions = [
      {label: 'rating_down', value: '!score'},
      {label: 'rating_up', value: 'score'}
    ];
    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.localStorageService.getEmailUser())),
      mergeMap ( user => {
        return forkJoin([this.activityService.getRatedActivities(user[0].id)]).pipe();
      })
    ).subscribe(
      ([response1]) => {
        this.listActivities = response1;
      }
    );
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

  /**
   * Método que ordena las actividades por valoración.
   *
   * @param event
   * Evento que se produce cuando una opción es seleccionada en el componente.
   */
  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
