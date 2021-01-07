import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {City} from '../models/city';
import {SelectItem} from 'primeng/api';
import {forkJoin} from 'rxjs';
import {CityService} from '../services/city/city.service';
import {InterestService} from '../services/interest/interest.service';
import {ActivityService} from '../services/activity/activity.service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private cityService: CityService,
    private interestService: InterestService,
    private activityService: ActivityService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activityId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editActivitiesForm = this.fb.group({
      description: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
      city: ['', Validators.required],
      interest: ['', Validators.required]
    });
    this.file =
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
          description: response3.description,
          latitude: response3.latitude,
          longitude: response3.longitude,
          city: response3.city,
          interest: response3.interest
        }
      );
    });
  }

  editActivity(){
    const formData = new FormData();
    console.log(this.editActivitiesForm.controls);
    formData.append('image', this.file);
    formData.append('description', this.editActivitiesForm.get('description').value);
    formData.append('latitude', this.editActivitiesForm.get('latitude').value);
    formData.append('longitude', this.editActivitiesForm.get('longitude').value);
    formData.append('city', this.editActivitiesForm.get('city').value);
    formData.append('interest', this.editActivitiesForm.get('interest').value);
    console.log(formData);
    formData.forEach(p => {
      console.log(p);
    });
    this.activityService.editActivity(this.activityId, formData).subscribe(
      data => {
        console.log(data);
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
      //preview.src = src;
      //preview.style.display = "block";
    }
  }

}
