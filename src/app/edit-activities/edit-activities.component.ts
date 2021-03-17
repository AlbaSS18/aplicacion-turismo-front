import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from '../models/city';
import {SelectItem} from 'primeng/api';
import {forkJoin} from 'rxjs';
import {CityService} from '../services/city/city.service';
import {InterestService} from '../services/interest/interest.service';
import {ActivityService} from '../services/activity/activity.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as L from 'leaflet';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-edit-activities',
  templateUrl: './edit-activities.component.html',
  styleUrls: ['./edit-activities.component.scss']
})
export class EditActivitiesComponent implements OnInit {

  editActivitiesForm: FormGroup;
  cities: SelectItem[];
  interest: SelectItem[];
  activityId;
  activity;
  file;
  image;
  valueUnchanged: boolean = true;

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id');

    this.editActivitiesForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required],
      interest: ['', Validators.required],
      address: ['', Validators.required]
    });

    this.observeChanges();

    forkJoin([
      this.cityService.getCities(),
      this.interestService.getInterests(),
      this.activityService.getActivity(this.activityId)
    ]).subscribe(([response1, response2, response3]) => {
      this.cities = [];
      response1.forEach( i => {
        this.cities.push({label: i.name, value: i.name});
      });
      this.interest = [];
      response2.forEach( i => {
        this.interest.push({label: i.nameInterest, value: i.nameInterest});
      });
      this.activity = response3;
      this.editActivitiesForm.patchValue(
        {
          name: response3.name,
          description: response3.description,
          latitude: response3.latitude,
          longitude: response3.longitude,
          city: response3.city,
          interest: response3.interest,
          address: response3.address
        }
      );

      var map = L.map('mapActivityEdit').setView([response3.latitude, response3.longitude], 8);

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);

      var opciones = {
        placeholder: "Escriba la dirección...",
        errorMessage: "No se han encontrado direcciones",
      };

      var control = L.Control.geocoder(opciones).on('markgeocode', function (e) {

        var latitud = e.geocode.center.lat;
        this.editActivitiesForm.controls['latitude'].setValue(latitud);

        var longitud = e.geocode.center.lng;
        this.editActivitiesForm.controls['longitude'].setValue(longitud);

        this.editActivitiesForm.controls['city'].setValue(e.geocode.properties.address.city);

        this.editActivitiesForm.controls['address'].setValue(e.geocode.name);
      }.bind(this)).addTo(map);

      control.options.geocoder.geocode(response3.address, function(results) {
          var resultado = results[0];
          if (resultado)
            control.markGeocode(resultado);
        }
      );

      var url = 'data:' + this.activity.metadataImage.mimeType + ';base64,' + this.activity.metadataImage.data;
      this.image = this.sanitizer.bypassSecurityTrustUrl(url);

      this.file = this.dataURItoBlob(url, this.activity.pathImage);
    });
  }

  dataURItoBlob(dataURI: any, fileName: string): File{

    // convert base64/URLEncoded data component to a file
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new File([ia], fileName, {type: mimeString});
  }


  observeChanges() {
    this.editActivitiesForm.valueChanges.subscribe((values) => {
      this.isEquivalent(this.activity, values);
    });
  }

  isEquivalent(a, b) {
    this.valueUnchanged = true;
    var aProps = Object.keys(a);
    var bProps = Object.keys(b);
    for (var i = 0; i < bProps.length; i++) {
      let propName = bProps[i];
      if (a[propName] !== b[propName]) {
        this.valueUnchanged = false;
        return false;
      }
    }
  }

  editActivity(){
    const formData = new FormData();
    console.log(this.editActivitiesForm.controls);
    formData.append('image', this.file);
    formData.append('name', this.editActivitiesForm.get('name').value);
    formData.append('description', this.editActivitiesForm.get('description').value);
    formData.append('latitude', this.editActivitiesForm.get('latitude').value);
    formData.append('longitude', this.editActivitiesForm.get('longitude').value);
    formData.append('city', this.editActivitiesForm.get('city').value);
    formData.append('interest', this.editActivitiesForm.get('interest').value);
    formData.append('address', this.editActivitiesForm.get('address').value);
    console.log(formData);
    formData.forEach(p => {
      console.log(p);
    });
    this.activityService.editActivity(this.activityId, formData).subscribe(
      data => {
        this.router.navigate(['/activities']);
      },
      err => {
        console.log(err);
      }
    );
  }

  changeImage(event){
    if (event.files[0]){
      var src = URL.createObjectURL(event.files[0]);
      var preview = document.getElementById("image-edit-activity").setAttribute( 'src', src);
      this.file = event.files[0];
      this.valueUnchanged = false;
    }
  }

  deleteFiles(event){
    this.valueUnchanged = true;
    var url = 'data:' + this.activity.metadataImage.mimeType + ';base64,' + this.activity.metadataImage.data;
    this.image = this.sanitizer.bypassSecurityTrustUrl(url);
  }

}
