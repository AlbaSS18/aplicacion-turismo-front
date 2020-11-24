import { Component, OnInit } from '@angular/core';
import {CityService} from '../services/city/city.service';
import {City} from '../models/city';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.css']
})
export class ListCitiesComponent implements OnInit {

  cities: City[];
  display: boolean = false;
  formAddCity: FormGroup;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {

    this.formAddCity = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.loadCities();
  }

  openPanel($event){
    this.display = true;
  }

  loadCities(){
    this.cityService.getCities().subscribe(
      (data) => {
        this.cities = data;
      }
    );
  }

  onSubmit(value: string){
    var city = {
      name: this.formAddCity.get('name').value
    };
    this.cityService.addCity(city).subscribe(
      data => {
        this.display = false;
        this.loadCities();
      },
      err => {
        console.log(err);
      }
    );
  }
}
