import { Component, OnInit } from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';
import * as L from 'leaflet';

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

  constructor(private activitiesService: ActivityService) { }

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
    console.log(this.markerList);
    var marker = L.marker([activity.latitude, activity.longitude]);
    var f = this.markerList.filter((act) => {
      return act._latlng.lat === activity.latitude && act._latlng.lng === activity.longitude;
    });
    console.log(f);
    //console.log(this.markerList[0]);
    //this.markerList.p
    this.map.removeLayer(f[0]);
  }

}
