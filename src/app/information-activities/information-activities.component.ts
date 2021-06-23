import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Activity} from '../models/activity';
import {ActivityService} from '../services/activity/activity.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-information-activities',
  templateUrl: './information-activities.component.html',
  styleUrls: ['./information-activities.component.scss']
})
/**
 * Clase InformationActivitiesComponent
 *
 * Clase que muestra información adicional de una actividad.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class InformationActivitiesComponent implements OnInit {

  /**
   * Almacena la actividad seleccionada.
   */
  activity: Activity;
  /**
   * Almacena la url de la imagen saneada.
   */
  image;

  /**
   * Constructor de la clase InformationActivitiesComponent
   *
   * @param ref
   * Servicio propocionado por la librería PrimeNG que permite devolver un valor al componente que lo creó.
   * @param config
   * Servicio propocionado por la librería PrimeNG que permite pasar información a los componentes dinámicos.
   * @param activityService
   * Servicio de actividades.
   * @param sanitizer
     Ayuda a prevenir los fallos de seguridad de Cross Site Scripting (XSS) saneando los valores para que sean seguros de usar en los diferentes contextos del DOM
   */
  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig, private activityService: ActivityService,  private sanitizer: DomSanitizer) { }

  /**
   * Método que permite inicializar los datos del componente.
   * <ul>
   *      <li>La actividad</li>
   *      <li>Saneará la URL de la imagen asociada a la actividad.</li>
   * </ul>
   */
  ngOnInit(): void {
    if (this.config.data){
      this.activity = this.config.data.activity;
      var url = 'data:' + this.activity.metadataImage.mimeType + ';base64,' + this.activity.metadataImage.data;
      this.image = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

}
