import { Component, OnInit } from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {Activity} from '../models/activity';
import {ActivityService} from '../services/activity/activity.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-information-activities',
  templateUrl: './information-activities.component.html',
  styleUrls: ['./information-activities.component.scss']
})
export class InformationActivitiesComponent implements OnInit {

  activity: Activity;
  image;

  constructor(private ref: DynamicDialogRef, public config: DynamicDialogConfig, private activityService: ActivityService,  private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if (this.config.data){
      this.activity = this.config.data.activity;
      var url = 'data:' + this.activity.metadataImage.mimeType + ';base64,' + this.activity.metadataImage.data;
      this.image = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

}
