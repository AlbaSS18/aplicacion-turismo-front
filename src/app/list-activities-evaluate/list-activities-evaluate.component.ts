import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import {ActivityRecommended} from '../models/activity';
import {UserService} from '../services/user/user.service';
import {ActivityService} from '../services/activity/activity.service';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-list-activities-evaluate',
  templateUrl: './list-activities-evaluate.component.html',
  styleUrls: ['./list-activities-evaluate.component.scss']
})
export class ListActivitiesEvaluateComponent implements OnInit {

  listActivities: ActivityRecommended[];

  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;

  constructor(
    private userService: UserService,
    private activityService: ActivityService,
    private localStorageService: LocalStorageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.sortOptions = [
      {label: 'Rating High to Low', value: '!score'},
      {label: 'Rating Low to High', value: 'score'}
  ];
    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.localStorageService.getEmailUser())),
      mergeMap ( user => {
        return forkJoin([this.activityService.getRatedActivities(user[0].id)]).pipe();
      })
    ).subscribe(
      ([response1]) => {
        this.listActivities = response1;
      }
    );
  }

  photoURL(activity){
    var url = 'data:' + activity.metadataImage.mimeType + ';base64,' + activity.metadataImage.data;
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  onSortChange(event) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

}
