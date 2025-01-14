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
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { LocalStorageService } from '../services/local-storage/local-storage.service';
import {InterestService} from '../services/interest/interest.service';
import {MockInterestService} from '../services/interest/interest-service-mock';
import {UserService} from '../services/user/user.service';
import {MockUserService} from '../services/user/user-service-mock';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';

describe('ListActivitiesEvaluateComponent', () => {
  let component: ListActivitiesEvaluateComponent;
  let fixture: ComponentFixture<ListActivitiesEvaluateComponent>;
  let localService: LocalStorageService;

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
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [
        LocalStorageService,
        {provide: UserService, useClass: MockUserService},
        {provide: ActivityService, useClass: MockActivityService}
      ]
    })
    .compileComponents();

    localService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    spyOn(localService, 'getEmailUser').and.returnValue('alba@email.com');
    fixture = TestBed.createComponent(ListActivitiesEvaluateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the list of activities evaluated', () => {
    expect(component.listActivities.length).toBe(1);
  });
});
