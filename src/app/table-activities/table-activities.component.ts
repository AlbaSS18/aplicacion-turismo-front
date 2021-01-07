import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import {ConfirmationService, MessageService, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../services/city/city.service';
import {Interest} from '../models/interest';
import {InterestService} from '../services/interest/interest.service';
import {ImagesService} from '../services/images/images.service';
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
  productDialog: boolean = false;
  formAddActivity: FormGroup;
  cities: SelectItem[];
  interest: SelectItem[];
  files;
  ref: DynamicDialogRef;
  noFiles: boolean = true;

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService,
    private imagesService: ImagesService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private messageService: MessageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'name_activity' },
      { field: 'description', header: 'description_activity' },
      { field: 'latitude', header: 'latitude' },
      { field: 'longitude', header: 'longitude' },
      { field: 'city', header: 'city' },
      { field: 'interest', header: 'interest'}
    ];
    this.formAddActivity = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      city: ['', [Validators.required]],
      nameInterest: ['', [Validators.required]]
    });
    this.loadCities();
    this.loadInterest();
    this.loadActivities();
  }

  loadCities(){
    this.cityService.getCities().subscribe(
      (data) => {
        this.cities = [];
        this.cities.push({label: 'Selecciona ciudad', value: null});
        data.forEach( i => {
          this.cities.push({label: i.name, value: i.name});
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loadInterest(){
    this.interestService.getInterests().subscribe(
      data => {
        this.interest = [];
        this.interest.push({label: 'Selecciona interés', value: null});
        data.forEach( i => {
          this.interest.push({label: i.nameInterest, value: i.nameInterest});
        });
      },
      err => {
        console.log(err);
      }
    );
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
      },
      reject: () => {

      }
    });
  }

  openNew(){
    this.productDialog = true;
  }

  onSubmit(value: string){
    if (this.files.length !== 0 && this.formAddActivity.valid){
      const formData = new FormData();
      formData.append('image', this.files);
      formData.append('name', this.formAddActivity.get('name').value);
      formData.append('description', this.formAddActivity.get('description').value);
      formData.append('latitude', this.formAddActivity.get('latitude').value);
      formData.append('longitude', this.formAddActivity.get('longitude').value);
      formData.append('city', this.formAddActivity.get('city').value);
      formData.append('interest', this.formAddActivity.get('nameInterest').value);
      console.log(formData);
      this.activityService.addActivity(formData).pipe(
        mergeMap( message => {
          return this.activityService.getActivities().pipe(
            map(data => {
              this.activities = data;
            })
          );
        })
      ).subscribe( data => {
          var message = this.translateService.instant('activity_add_message',{ 'nameActivity': this.formAddActivity.get('name').value });
          this.productDialog = false;
          //this.formAddInterest.reset();
          this.messageService.add({key: 'activity', severity:'success', summary: this.translateService.instant('interest_add'), detail: message });
        },
        err => {
          //this.errorAddInterest = true;
        }
      );
    }

  }

  dealWithFiles(event){
    this.files = event.files[0];
    this.noFiles = false;
  }

  deleteFiles(event){
    this.files = [];
    this.noFiles = true;
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

  onCancel(){
    this.productDialog = false;
    this.formAddActivity.reset();
  }

  editActivity(activity){
    this.router.navigateByUrl('activities/edit/' + activity.id);
  }

}
