import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationMapComponent } from './recommendation-map.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {DataViewModule} from 'primeng/dataview';
import {RouterTestingModule} from '@angular/router/testing';
import {DialogService} from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import {RatingModule} from 'primeng/rating';
import {MultiSelectModule} from 'primeng/multiselect';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';
import {UserService} from '../services/user/user.service';
import {MockUserService} from '../services/user/user-service-mock';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';

describe('RecommendationMapComponent', () => {
  let component: RecommendationMapComponent;
  let fixture: ComponentFixture<RecommendationMapComponent>;
  let localService: LocalStorageService;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
        DataViewModule,
        RouterTestingModule,
        DialogModule,
        RatingModule,
        MultiSelectModule,
        InputTextModule,
        ButtonModule,
        CheckboxModule
      ],
      declarations: [ RecommendationMapComponent, MenuBarComponent ],
      providers: [
        {provide: ActivityService, useClass: MockActivityService},
        {provide: UserService, useClass: MockUserService},
        LocalStorageService
      ]
    })
    .compileComponents();

    localService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    spyOn(localService, 'getEmailUser').and.returnValue('alba@email.com');
    fixture = TestBed.createComponent(RecommendationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the recommended activities', () => {
    expect(component.activitiesRecommendation.length).toBe(2);
  });

  it('should open the dialog', () => {
    const activity = {
      address: "Teatro Campoamor, 1, Calle Progreso, Casco Antiguo, Centro y casco histórico, Oviedo, 33003, España",
      average: 0,
      locality: "Oviedo",
      description: "El teatro Campoamor es el teatro de ópera de Oviedo, fundado en 1892 y conocido entre otras cosas por ser el escenario de la entrega de los Premios Princesa de Asturias.",
      id: 99,
      interest: "Teatros",
      latitude: 43.36305525,
      longitude: -5.847793444053352,
      metadataImage: {
        filename: "84-teatro-campoamor",
        mimeType: "image/jpg",
        data: "/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2Qtan…EzxZf1iH9V0Q+FYM7fmbYYxk/VjSJbziKjKy2nmBWWz//2Q=="
      },
      name: "Teatro Campoamor",
      pathImage: "84-teatro-campoamor.jpg",
      score: 8
    };
    component.openPanelToRating(activity);
    expect(component.activitySelectedToRate).toEqual(activity);
    expect(component.displayPanelRating).toBeTrue();

  });

  it('should rate the activity', () => {
    component.formToRatingActivity.controls['rating'].setValue(5);
    component.activitySelectedToRate = {
      address: "Teatro Campoamor, 1, Calle Progreso, Casco Antiguo, Centro y casco histórico, Oviedo, 33003, España",
      average: 0,
      locality: "Oviedo",
      description: "El teatro Campoamor es el teatro de ópera de Oviedo, fundado en 1892 y conocido entre otras cosas por ser el escenario de la entrega de los Premios Princesa de Asturias.",
      id: 99,
      interest: "Teatros",
      latitude: 43.36305525,
      longitude: -5.847793444053352,
      metadataImage: {
        filename: "84-teatro-campoamor",
        mimeType: "image/jpg",
        data: "/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2Qtan…EzxZf1iH9V0Q+FYM7fmbYYxk/VjSJbziKjKy2nmBWWz//2Q=="
      },
      name: "Teatro Campoamor",
      pathImage: "84-teatro-campoamor.jpg",
      score: 8
    };
    component.sendRatingActivity();
    expect(component.activitiesRecommendation.length).toBe(3);
  });
});
