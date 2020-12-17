import { Component, OnInit } from '@angular/core';
import {CityService} from '../services/city/city.service';
import {City} from '../models/city';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {map, mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit {

  cities: City[];
  display: boolean = false;
  formAddCity: FormGroup;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private messageService: MessageService
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

  removeCity(city){
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_city'),
      accept: () => {
        this.cityService.deleteCity(city).pipe(
          mergeMap( message => {
            return this.cityService.getCities().pipe(
              map(data => {
                this.cities = data;
              })
            );
          })
        ).subscribe( data => {
            var message = this.translateService.instant('city_delete_message',{ 'nameCity': city.name });
            this.messageService.add({key: 'city', severity:'success', summary: this.translateService.instant('city_delete'), detail: message });
          },
          (err) => {
            var message = this.translateService.instant('error_delete_message');
            this.messageService.add({key: 'city', severity:'error', summary: this.translateService.instant('error'), detail: message });
          }
        );
      }
    });
  }
}
