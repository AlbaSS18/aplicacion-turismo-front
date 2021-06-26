import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLocalitiesComponent } from './list-localities.component';
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

describe('ListLocalitiesComponent', () => {
  let component: ListLocalitiesComponent;
  let fixture: ComponentFixture<ListLocalitiesComponent>;

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
      declarations: [ ListLocalitiesComponent, MenuBarComponent ],
      providers: [
        ConfirmationService,
        MessageService,
        {provide: LocalityService, useClass: MockCityService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLocalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the localities', () => {
    expect(component.localities.length).toBe(2);
  });

  it('should delete the city', () => {
    let confirmService = fixture.debugElement.injector.get(ConfirmationService);
    spyOn(confirmService, 'confirm').and.callFake((confirmation: Confirmation) => { return confirmation.accept(); });
    var city = {
      id: 2,
      name: 'Oviedo'
    };
    component.removeCity(city);
    expect(component.localities.length).toBe(1);
  });


  it('should edit the city', () => {
    component.formEditLocality.controls['id'].setValue(2);
    component.formEditLocality.controls['name'].setValue('Ov');
    component.onEditSubmit();
    expect(component.displayEditPanel).toBeFalse();
    const updateItem = component.localities.find(city => city.id === 2);
    expect(updateItem.name).toBe('Ov');
  });

  it('should add a city', () => {
    component.formAddLocality.controls['name'].setValue('Avilés');
    component.onSubmit();

    expect(component.display).toBeFalse();
    expect(component.localities.length).toBe(3);
  });
});
