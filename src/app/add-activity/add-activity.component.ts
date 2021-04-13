import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../services/city/city.service';
import {InterestService} from '../services/interest/interest.service';
import {MessageService, SelectItem} from 'primeng/api';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import {ActivityService} from '../services/activity/activity.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent implements OnInit {

  formAddActivity: FormGroup;
  cities: SelectItem[];
  interest: SelectItem[];
  files;
  noFiles: boolean = true;

  messageError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService,
    private activityService: ActivityService,
    private router: Router,
    private translateService: TranslateService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.formAddActivity = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
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
      console.log(council);
      this.formAddActivity.controls['city'].setValue(council);

      this.formAddActivity.controls['address'].setValue(e.geocode.name);
    }.bind(this)).addTo(map);

    this.loadCities();
    this.loadInterest();
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

  dealWithFiles(event){
    this.files = event.files[0];
    this.noFiles = false;
  }

  deleteFiles(event){
    this.files = [];
    this.noFiles = true;
  }

  addActivity(){
    if (this.files.length !== 0 && this.formAddActivity.valid){
      const formData = new FormData();
      formData.append('image', this.files);
      formData.append('name', this.formAddActivity.get('name').value);
      formData.append('description', this.formAddActivity.get('description').value);
      formData.append('latitude', this.formAddActivity.get('latitude').value);
      formData.append('longitude', this.formAddActivity.get('longitude').value);
      formData.append('city', this.formAddActivity.get('city').value);
      formData.append('interest', this.formAddActivity.get('nameInterest').value);
      formData.append('address', this.formAddActivity.get('address').value);
      this.activityService.addActivity(formData).subscribe(
        data => {

          var message = this.translateService.instant('activity_add_message',{ 'nameActivity': this.formAddActivity.get('name').value });
          this.messageService.add({key: 'activity_added', severity: 'success', summary: this.translateService.instant('activity_add'), detail:message});

          setTimeout(() => {
            this.router.navigate(['/activities']);
          }, 1500);
        },
        err => {
          console.log(err);
          if (err.error = "La ciudad no existe"){
            this.messageError = true;
          }
        }
      );
    }
  }

}
