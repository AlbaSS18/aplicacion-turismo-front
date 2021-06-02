import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActivityComponent } from './add-activity.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {FileUploadModule} from 'primeng/fileupload';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';
import {MessageService} from 'primeng/api';
import {RouterTestingModule} from '@angular/router/testing';

xdescribe('AddActivityComponent', () => {
  let component: AddActivityComponent;
  let fixture: ComponentFixture<AddActivityComponent>;

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
        RouterTestingModule
      ],
      providers: [
        {provide: ActivityService, useClass: MockActivityService},
        MessageService
      ]
    })
    .compileComponents();
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
    expect(component).toBeTruthy();
  });

  xit('should add an activity', () => {
    const fakeFile = (): File => {
      const blob = new Blob([''], { type: 'text/html' });
      return blob as File;
    };
    component.files = fakeFile;
    component.addActivity();
    expect(location.pathname).toBe('/activities');
  });
});
