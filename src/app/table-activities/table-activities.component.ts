import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../services/city/city.service';
import {Interest} from '../models/interest';
import {InterestService} from '../services/interest/interest.service';
import {ImagesService} from '../services/images/images.service';
import {DialogService} from 'primeng/dynamicdialog';

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

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService,
    private imagesService: ImagesService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
      { field: 'latitude', header: 'Latitud' },
      { field: 'longitude', header: 'Longitud' },
      { field: 'city', header: 'Ciudad' },
      { field: 'interest', header: 'Interest'}
    ];
    this.formAddActivity = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      pathImage: ['', [Validators.required]],
      city: '',
      nameInterest: ''
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
        /*this.activities.forEach(act => {
          this.imagesService.getImages("museoferrocarril.jpg").subscribe(
            imagePhoto => {
              act.image = imagePhoto;
            }
          );
          }
        );*/
      },
      (err) => {
        console.log(err);
      });
  }

  confirm(){
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar esta actividad? Se eliminarán todos los datos relacionados',
      accept: () => {

      },
      reject: () => {

      }
    });
  }

  openNew(){
    this.productDialog = true;
  }

  onSubmit(value: string){
    const formData = new FormData();
    formData.append('image', this.files);
    formData.append('name', this.formAddActivity.get('name').value);
    formData.append('description', this.formAddActivity.get('description').value);
    formData.append('latitude', this.formAddActivity.get('latitude').value);
    formData.append('longitude', this.formAddActivity.get('longitude').value);
    formData.append('city', this.formAddActivity.get('city').value);
    formData.append('interest', this.formAddActivity.get('nameInterest').value);
    this.activityService.addActivity(formData).subscribe(
      (data) => {
        this.productDialog = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  dealWithFiles(event){
    this.files = event.files[0];
  }

}
