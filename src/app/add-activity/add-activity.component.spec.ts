import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { AddActivityComponent } from './add-activity.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Router, RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';
import {MessageService} from 'primeng/api';
import {RouterTestingModule} from '@angular/router/testing';
import {ToastModule} from 'primeng/toast';
import {InterestService} from '../services/interest/interest.service';
import {MockInterestService} from '../services/interest/interest-service-mock';

describe('AddActivityComponent', () => {
  let component: AddActivityComponent;
  let fixture: ComponentFixture<AddActivityComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddActivityComponent, MenuBarComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        TranslateModule.forRoot(),
        FileUploadModule,
        ButtonModule,
        DropdownModule,
        RouterTestingModule,
        ToastModule
      ],
      providers: [
        {provide: ActivityService, useClass: MockActivityService},
        MessageService,
        {provide: InterestService, useClass: MockInterestService}
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the interest', () => {
    const interest = [
      {
        label: 'Selecciona interés',
        value: null
      },
      {
        label: 'Museos',
        value: 'Museos'
      },
      {
        label: 'Iglesias',
        value: 'Iglesias'
      }
    ];
    expect(component.interest).toEqual(interest);
  });

  it('should add an activity', fakeAsync(() => {
    // ERROR
    const fakeFile = (): File => {
      const blob = new Blob([''], { type: 'image/jpg' });
      blob['lastModifiedDate'] = "";
      blob['name'] = "filename";
      return blob as File;
    };
    component.files = fakeFile;

    const navigateSpy = spyOn(router, 'navigate');
    component.formAddActivity.controls['name'].setValue('Campo de San Francisco');
    component.formAddActivity.controls['description'].setValue('El Campo de San Francisco es un parque urbano situado en el centro de la ciudad Oviedo (España).');
    component.formAddActivity.controls['latitude'].setValue(43.361178800000005);
    component.formAddActivity.controls['longitude'].setValue(-5.850675357790575);
    component.formAddActivity.controls['city'].setValue('Oviedo');
    component.formAddActivity.controls['nameInterest'].setValue('Parques');
    component.formAddActivity.controls['address'].setValue('Parque de San Francisco, Llamaquique, Centro y casco histórico, Oviedo, España');

    component.addActivity();

    tick(2500);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/activities']);
  }));
});
