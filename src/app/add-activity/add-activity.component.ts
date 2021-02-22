import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CityService} from '../services/city/city.service';
import {InterestService} from '../services/interest/interest.service';
import {SelectItem} from 'primeng/api';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet/dist/images/marker-shadow.png';
import 'leaflet/dist/images/marker-icon-2x.png';
import {ActivityService} from '../services/activity/activity.service';
import {ActivatedRoute, Router} from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService,
    private activityService: ActivityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    L.Icon.Default.ImagePath = 'assests/leaflet/';
    this.formAddActivity = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
      city: ['', [Validators.required]],
      nameInterest: ['', [Validators.required]]
    });

    var map = L.map('mapActivity').setView([43.333333, -6], 8);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var opciones = {
      placeholder: "Escriba la dirección...",
      errorMessage: "No se han encontrado direcciones",
    };

    var control = L.Control.geocoder(opciones).on('markgeocode', function (e) {

      var latitud = e.geocode.center.lat;
      this.formAddActivity.controls['latitude'].setValue(latitud);

      var longitud = e.geocode.center.lng;
      this.formAddActivity.controls['longitude'].setValue(longitud);

      this.formAddActivity.controls['city'].setValue(e.geocode.properties.address.city);

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
    console.log(this.files);
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
      console.log(formData);
      this.activityService.addActivity(formData).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['activities']);
        }
      );
    }
  }

}
