import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivitiesEvaluateComponent } from './list-activities-evaluate.component';
import {TranslateModule} from '@ngx-translate/core';
import {DataViewModule} from 'primeng/dataview';
import {RatingModule} from 'primeng/rating';
import {DropdownModule} from 'primeng/dropdown';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TagModule} from 'primeng/tag';
import {FormsModule} from '@angular/forms';

describe('ListActivitiesEvaluateComponent', () => {
  let component: ListActivitiesEvaluateComponent;
  let fixture: ComponentFixture<ListActivitiesEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActivitiesEvaluateComponent, MenuBarComponent ],
      imports: [
        TranslateModule.forRoot(),
        DataViewModule,
        RatingModule,
        DropdownModule,
        RouterTestingModule,
        TagModule,
        FormsModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActivitiesEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
