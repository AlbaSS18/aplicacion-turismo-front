import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import * as L from 'leaflet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {Interest} from '../models/interest';
import {SelectItem} from 'primeng/api';
import {CityService} from '../services/city/city.service';

@Component({
  selector: 'app-recommendation-map',
  templateUrl: './recommendation-map.component.html',
  styleUrls: ['./recommendation-map.component.scss']
})
export class RecommendationMapComponent implements OnInit {

  activitiesRecommendation;
  activitiesSelected:string[] = [];
  map;
  markerList = [];
  displayPanelRating: boolean = false;
  formToRatingActivity: FormGroup;
  activitySelectedToRate;
  listInterest: SelectItem[] = [];
  selectedInterest;
  listCities: SelectItem[] = [];
  selectedCity;

  @ViewChild('dv') dataView;

  constructor(private activitiesService: ActivityService, private fb: FormBuilder, private interestService: InterestService, private cityService: CityService) {
    this.formToRatingActivity = this.fb.group({
      rating: ['', Validators.required],
    });
  }

  ngOnInit(): void {

    this.map = L.map('mapActivityRecommendation', {
      center: [ 43.333333, -6 ],
      zoom: 8
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);


    this.activitiesService.getActivities().subscribe(data => {
      this.activitiesRecommendation = data;

      this.activitiesRecommendation.forEach(activity => {
        this.activitiesSelected.push(activity.name);

        var greenIcon = L.icon({
          iconUrl: '../../assets/images/landscape.png',
          iconSize: [35, 35], // size of the icon
        });

        var photoImg = '<img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Gij%C3%B3n_old_FEVE_station.JPG" width="100%"/>';

        const popupContent =
          photoImg +
          '<div>' +
          '<h2>' +
          activity.name  +
          '</h2>' + '<div><i class="fas fa-map-marker-alt"></i> ' + activity.address + '</div>' + '<div><i class="fas fa-tags"></i> ' + activity.interest + '</div>'  + '</div>';

        var marker = L.marker([activity.latitude, activity.longitude], {icon: greenIcon}).addTo(this.map).bindPopup(popupContent, {
          maxWidth : 250
        });
        this.markerList.push(marker);
      });

    });

    this.interestService.getInterests().subscribe(data => {
      data.forEach(interest => {
        this.listInterest.push({label: interest.nameInterest, value: interest});
      });
    });

    this.cityService.getCities().subscribe(cities => {
      cities.forEach(city => {
        this.listCities.push({label: city.name, value: city});
      });
    });
  }

  changeMap(event, activity){
    if (event.checked){
      var greenIcon = L.icon({
        iconUrl: '../../assets/images/landscape.png',
        iconSize: [35, 35], // size of the icon
      });

      var photoImg = '<img src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Gij%C3%B3n_old_FEVE_station.JPG" width="100%"/>';

      const popupContent =
        photoImg +
        '<div>' +
        '<h2>' +
        activity.name  +
        '</h2>' + '<div><i class="fas fa-map-marker-alt"></i> ' + activity.address + '</div>' + '<div><i class="fas fa-tags"></i> ' + activity.interest + '</div>'  + '</div>';


      var marker = L.marker([activity.latitude, activity.longitude], {icon: greenIcon}).addTo(this.map).bindPopup(popupContent, {
        maxWidth : 250
      });
      this.markerList.push(marker);
    }
    else{
      this.removeMarkerFromMap(activity);
    }
  }

  openPanelToRating(event, activity){
    this.formToRatingActivity.patchValue({
      rating: []
    });
    this.activitySelectedToRate = activity;
    this.displayPanelRating = true;
  }

  sendRatingActivity(){
    this.displayPanelRating = false;
    var aux = this.activitiesRecommendation;
    const index = aux.indexOf(this.activitySelectedToRate);
    if (index > -1) {
      aux.splice(index, 1);
    }
    this.activitiesRecommendation = [...aux];
    this.removeMarkerFromMap(this.activitySelectedToRate);
    console.log(this.formToRatingActivity);
  }

  removeMarkerFromMap(activity){
    var f = this.markerList.filter((act) => {
      return act._latlng.lat === activity.latitude && act._latlng.lng === activity.longitude;
    });
    // NOTE: Puede haber un marcador con la misma longitude y latitude. Cuidado
    if (f.length !== 0){
      const index = this.markerList.indexOf(f[0]);
      if (index > -1) {
        this.markerList.splice(index, 1);
      }
      this.map.removeLayer(f[0]);
    }
  }

  filterDataViewToNameInterest(event){
    var aux = [];
    event.value.forEach(p => {
      aux.push(p.nameInterest);
    })
    this.dataView.filter(aux, 'in');
  }

  filterDataViewToNameCity(event){
    console.log(event);
    var aux = [];
    event.value.forEach(p => {
      aux.push(p.name);
    })
    this.dataView.filter(aux, 'in');
  }
}
