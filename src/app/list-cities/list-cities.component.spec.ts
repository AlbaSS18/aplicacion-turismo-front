import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitiesComponent } from './list-cities.component';
import {DialogModule} from 'primeng/dialog';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { LocalityService } from '../services/city/locality.service';
import { MockCityService } from '../services/city/locality-service-mock';

describe('ListCitiesComponent', () => {
  let component: ListCitiesComponent;
  let fixture: ComponentFixture<ListCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogModule,
        VirtualScrollerModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        CardModule,
        ButtonModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ToastModule,
        ConfirmDialogModule
      ],
      declarations: [ ListCitiesComponent, MenuBarComponent ],
      providers: [
        ConfirmationService,
        MessageService,
        {provide: LocalityService, useClass: MockCityService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the cities', () => {
    expect(component.cities.length).toBe(2);
  });

  it('should delete the city', () => {
    let confirmService = fixture.debugElement.injector.get(ConfirmationService);
    spyOn(confirmService, 'confirm').and.callFake((confirmation: Confirmation) => { return confirmation.accept(); });
    var city = {
      id: 2,
      name: 'Oviedo'
    };
    component.removeCity(city);
    expect(component.cities.length).toBe(1);
  });


  it('should edit the city', () => {
    component.formEditCity.controls['id'].setValue(2);
    component.formEditCity.controls['name'].setValue('Ov');
    component.onEditSubmit();
    expect(component.displayEditPanel).toBeFalse();
    const updateItem = component.cities.find(city => city.id === 2);
    expect(updateItem.name).toBe('Ov');
  });

  it('should add a city', () => {
    component.formAddCity.controls['name'].setValue('Avilés');
    component.onSubmit();

    expect(component.display).toBeFalse();
    expect(component.cities.length).toBe(3);
  });
});
