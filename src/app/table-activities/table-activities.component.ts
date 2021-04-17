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
export class TableActivitiesComponent implements OnInit {

  cols: any[];
  activities;
  ref: DynamicDialogRef;

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'name_activity' },
      { field: 'description', header: 'description_activity' },
      { field: 'city', header: 'city' },
      { field: 'interest', header: 'interest'}
    ];
    this.loadActivities();
  }

  loadActivities(){
    this.activityService.getActivities().subscribe(
      data => {
        this.activities = data;
      },
      (err) => {
        console.log(err);
      });
  }

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

  openNew(){
    this.router.navigate(['activities/add']);
  }

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

  ngOnDestroy() {
    if (this.ref){
      this.ref.close();
    }
  }

  editActivity(activity){
    this.router.navigateByUrl('activities/edit/' + activity.id);
  }

  photoURL(activity){
    var url = 'data:' + activity.metadataImage.mimeType + ';base64,' + activity.metadataImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
