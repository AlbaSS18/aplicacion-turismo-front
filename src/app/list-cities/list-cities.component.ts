import { Component, OnInit } from '@angular/core';
import {CityService} from '../services/city/city.service';
import {City} from '../models/city';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-list-cities',
  templateUrl: './list-cities.component.html',
  styleUrls: ['./list-cities.component.scss']
})
export class ListCitiesComponent implements OnInit {

  cities: City[];
  display: boolean = false;
  formAddCity: FormGroup;
  errorAddCity: boolean = false;
  errorEditCity: boolean = false;
  displayEditPanel: boolean = false;
  formEditCity: FormGroup;

  constructor(
    private cityService: CityService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private translateService: TranslateService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.formAddCity = this.formBuilder.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.formEditCity = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
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

  onSubmit(){
    var city = {
      name: this.formAddCity.get('name').value
    };
    this.cityService.addCity(city).pipe(
      mergeMap( message => {
        return this.cityService.getCities().pipe(
          map(data => {
            this.cities = data;
          })
        );
      })
    ).subscribe( data => {
        var message = this.translateService.instant('city_add_message',{ 'nameCity': this.formAddCity.get('name').value });
        this.display = false;
        this.formAddCity.reset();
        this.messageService.add({key: 'city', severity:'success', summary: this.translateService.instant('city_add'), detail: message });
      },
      err => {
        this.errorAddCity = true;
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
            if (err.status === 500){
              var message = this.translateService.instant('city_has_activities');
              this.messageService.add({key: 'city', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
            else{
              var message = this.translateService.instant('error_delete_message');
              this.messageService.add({key: 'city', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
          }
        );
      }
    });
  }

  hideDialogCity(){
    this.formAddCity.reset();
    this.errorAddCity = false;
  }

  hideDialogEditCity(){
    this.errorEditCity = false;
  }

  cancel(){
    this.display = false;
  }

  editCity(city){
    this.displayEditPanel = true;
    this.formEditCity.patchValue({
        id: city.id,
        name : city.name
      }
    );
  }

  onEditSubmit(){
    var city = {
      name : this.formEditCity.get('name').value
    };

    this.cityService.editCity(this.formEditCity.get('id').value, city).pipe(
      mergeMap(message => {
        return this.cityService.getCities().pipe();
      })
    ).subscribe( data => {
      this.displayEditPanel = false;
      var message = this.translateService.instant('city_edit_message',{ 'nameCity': city.name });
      this.messageService.add({key: 'city', severity:'success', summary: this.translateService.instant('city_edit'), detail: message });
      this.cities = data;
    },
      err => {
        this.errorEditCity = true;
      });
  }

  cancelEdit(){
    this.displayEditPanel = false;
  }


}
