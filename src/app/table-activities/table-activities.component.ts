import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../services/city/city.service';
import {Interest} from '../models/interest';
import {InterestService} from '../services/interest/interest.service';

@Component({
  selector: 'app-table-activities',
  templateUrl: './table-activities.component.html',
  styleUrls: ['./table-activities.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TableActivitiesComponent implements OnInit {

  cols: any[];
  activities;
  productDialog: boolean = false;
  formAddActivity: FormGroup;
  cities: SelectItem[];
  interest: SelectItem[];

  constructor(
    private activityService: ActivityService,
    private confirmationService: ConfirmationService,
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService
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
    console.log(this.formAddActivity.get('city').value);
    console.log(value);
    var activity = {
      name: this.formAddActivity.get('name').value,
      description: this.formAddActivity.get('description').value,
      latitude: this.formAddActivity.get('latitude').value,
      longitude: this.formAddActivity.get('longitude').value,
      pathImage: 'src/app/img/' + this.formAddActivity.get('name').value + '.jpg',
      city: this.formAddActivity.get('city').value,
      interest: this.formAddActivity.get('nameInterest').value
    }
    console.log(activity);
    this.activityService.addActivity(activity).subscribe(
      (data) => {
        this.productDialog = false;
      },
      err => {
        console.log(err);
      }
    );
  }

}
