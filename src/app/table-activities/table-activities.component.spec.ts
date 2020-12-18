import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableActivitiesComponent } from './table-activities.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ConfirmationService, MessageService, SharedModule} from 'primeng/api';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivityService} from '../services/activity/activity.service';
import {CityService} from '../services/city/city.service';
import {InterestService} from '../services/interest/interest.service';
import {MenubarModule} from 'primeng/menubar';
import {TableModule} from 'primeng/table';
import {ToolbarModule} from 'primeng/toolbar';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DialogModule} from 'primeng/dialog';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {DialogService} from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ToastModule} from 'primeng/toast';

describe('TableActivitiesComponent', () => {
  let component: TableActivitiesComponent;
  let fixture: ComponentFixture<TableActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableActivitiesComponent, MenuBarComponent ],
      imports: [
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        MenubarModule,
        TableModule,
        ToolbarModule,
        ConfirmDialogModule,
        DialogModule,
        SharedModule,
        InputNumberModule,
        DropdownModule,
        FileUploadModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ToastModule
      ],
      providers: [
        ConfirmationService,
        ActivityService,
        CityService,
        InterestService,
        FormBuilder,
        DialogService,
        MessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
