import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import {InformationActivitiesComponent} from '../information-activities/information-activities.component';
import {TranslateService} from '@ngx-translate/core';
import {map, mergeMap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-table-activities',
  templateUrl: './table-activities.component.html',
  styleUrls: ['./table-activities.component.scss']
})
/**
 * Clase TableActivitiesComponent
 *
 * Clase que muestra la lista de actividades del sistema.
 *
 * @author Alba Serena Suárez
 * @version 1.0
 */
export class TableActivitiesComponent implements OnInit {

  /**
   * Array de objetos que representan las columnas del componente tabla.
   */
  cols: any[];
  /**
   * Almacena las actividades.
   */
  activities;
  /**
   * Servicio propocionado por la librería PrimeNG que permite pasar información a los componentes dinámicos.
   */
  ref: DynamicDialogRef;

  /**
   * Constructor de la clase EditActivitiesComponent
   *
   * @param activityService
   * Servicio de actividades.
   * @param confirmationService
   * Servicio propocionado por la librería PrimeNG que permite mostrar un diálogo de confirmación.
   * @param dialogService
   * Servicio propocionado por la librería PrimeNG que permite mostrar un diálogo.
   * @param translateService
   * Servicio proporcionado por la librería ngx-translate que se utiliza para la internacionalización de la aplicación.
   * @param messageService
   * Servicio propocionado por la librería PrimeNG que permite almacenar los mensajes que serán mostrados al usuario.
   * @param router
   * Servicio que permite la navegación entre vistas
   * @param sanitizer
   * Ayuda a prevenir los fallos de seguridad de Cross Site Scripting (XSS) saneando los valores para que sean seguros de usar en los diferentes contextos del DOM
   */
  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  /**
   * Método que permite inicializar los datos del componente.
   *  <ul>
   *      <li>Inicializará los objetos que representan una columna de la tabla.</li>
   *      <li>Cargará las actividades.</li>
   *  </ul>
   */
  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'name_activity' },
      { field: 'description', header: 'description_activity' },
      { field: 'city', header: 'city' },
      { field: 'interest', header: 'interest'}
    ];
    this.loadActivities();
  }

  /**
   * Método que obtiene las actividades de la API y las almacena.
   */
  loadActivities(){
    this.activityService.getActivities().subscribe(
      data => {
        this.activities = data;
      },
      (err) => {
        console.log(err);
      });
  }

  /**
   * Método que elimina una actividad del sistema a través de la API.
   * Una vez enviado, también será el encargado de mostrar un mensaje al usuario.
   * @param activity
   * Actividad que se desea eliminar.
   */
  confirm(activity){
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_activity'),
      accept: () => {
        this.activityService.deleteActivity(activity.id).pipe(
          mergeMap( message => {
            return this.activityService.getActivities().pipe(
              map(data => {
                this.activities = data;
              })
            );
          })
        ).subscribe( data => {
            var message = this.translateService.instant('activity_delete_message',{ 'nameActivity': activity.name });
            this.messageService.add({key: 'activity', severity:'success', summary: this.translateService.instant('interest_delete'), detail: message });
          },
          (err) => {
            var message = this.translateService.instant('error_delete_message');
            this.messageService.add({key: 'activity', severity:'error', summary: this.translateService.instant('error'), detail: message });
          }
        );
      }
    });
  }

  /**
   * Método que redirige al usuario al componente AddActivity.
   */
  openNew(){
    this.router.navigate(['activities/add']);
  }

  /**
   * Método que abre el componente InformationActivities para mostrar información adicional de la actividad.
   * @param activity
   * Actividad de la que se quiere obtener información adicional.
   */
  seeMoreInfo(activity){
    this.ref = this.dialogService.open(InformationActivitiesComponent,
      {
        data: {
          'activity' : activity,
        },
        header: this.translateService.instant('info_dialog_title') + activity.name,
        width: '70%'
      });

    this.ref.onClose.subscribe((activity) => {
      console.log("Aqui");
    });
  }

  /**
   * Método que se ejecuta al destruir un componente.
   */
  ngOnDestroy() {
    if (this.ref){
      this.ref.close();
    }
  }

  /**
   * Método que redirige al usuario al componente EditActivities.
   */
  editActivity(activity){
    this.router.navigateByUrl('activities/edit/' + activity.id);
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
