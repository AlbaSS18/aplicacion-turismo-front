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

describe('RecommendationMapComponent', () => {
  let component: RecommendationMapComponent;
  let fixture: ComponentFixture<RecommendationMapComponent>;

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
        MultiSelectModule
      ],
      declarations: [ RecommendationMapComponent, MenuBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendationMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
