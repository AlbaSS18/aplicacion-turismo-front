import { Component, OnInit } from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import * as L from 'leaflet';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  constructor(private activitiesService: ActivityService, private fb: FormBuilder) {
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
        var marker = L.marker([activity.latitude, activity.longitude]).addTo(this.map);
        this.markerList.push(marker);
      });

    });

  }

  changeMap(event, activity){
    if (event.checked){
      var marker = L.marker([activity.latitude, activity.longitude]).addTo(this.map);
      this.markerList.push(marker);
    }
    else{
      this.removeMarkerFromMap(activity);
    }
  }

  openPanelToRating(event, activity){
    this.formToRatingActivity.patchValue({
      rating: ['']
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
  }

  removeMarkerFromMap(activity){
    var f = this.markerList.filter((act) => {
      return act._latlng.lat === activity.latitude && act._latlng.lng === activity.longitude;
    });
    if (f.length !== 0){
      const index = this.markerList.indexOf(f[0]);
      if (index > -1) {
        this.markerList.splice(index, 1);
      }
      this.map.removeLayer(f[0]);
    }
  }

}
