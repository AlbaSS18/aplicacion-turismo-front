import { Component, OnInit } from '@angular/core';
import {ActivityService} from '../services/activity/activity.service';

@Component({
  selector: 'app-table-activities',
  templateUrl: './table-activities.component.html',
  styleUrls: ['./table-activities.component.css']
})
export class TableActivitiesComponent implements OnInit {

  cols: any[];
  constructor(private activityService: ActivityService) { }
  activities;

  ngOnInit(): void {
    this.cols = [
      { field: 'photo', header: 'Imagen'},
      { field: 'name', header: 'Nombre' },
      { field: 'description', header: 'Descripción' },
      { field: 'latitude', header: 'Latitud' },
      { field: 'longitude', header: 'Longitud' },
      { field: 'city', header: 'Ciudad' },
      { field: 'interest', header: 'Interest'}
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

}
