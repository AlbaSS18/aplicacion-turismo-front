import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Activity} from '../models/activity';

@Component({
  selector: 'app-information-activities',
  templateUrl: './information-activities.component.html',
  styleUrls: ['./information-activities.component.scss']
})
export class InformationActivitiesComponent implements OnInit {

  activity: Activity;

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.activity = this.config.data.activity;
  }

}
