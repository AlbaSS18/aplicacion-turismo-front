import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { TableActivitiesComponent } from './table-activities.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {Confirmation, ConfirmationService, MessageService, SharedModule} from 'primeng/api';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivityService} from '../services/activity/activity.service';
import {LocalityService} from '../services/locality/locality.service';
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
import {MockActivityService} from '../services/activity/activity-service-mock';
import {DebugElement} from '@angular/core';
import {by, By} from 'protractor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('TableActivitiesComponent', () => {
  let component: TableActivitiesComponent;
  let fixture: ComponentFixture<TableActivitiesComponent>;
  let rootElement: DebugElement;

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
        ToastModule,
        BrowserAnimationsModule
      ],
      providers: [
        ConfirmationService,
        {provide: ActivityService, useClass: MockActivityService},
        LocalityService,
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
    rootElement = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all activities', () => {
    expect(component.activities.length).toBe(2);
  });

  it('should remove the activity', () => {
    var activityToRemove = {
      id: 1,
      name: 'Universidad Laboral',
      description: 'Universidad situada en Gijón',
      latitude: 43.524088,
      longitude: -5.614049,
      pathImage: 'universidad.jpg',
      city: 'Gijón',
      interest: 'Iglesia',
      address: 'Universidad Laboral, Calle José Luis Álvarez Margaride, Cabueñes, La Guía, Distrito Rural, Gijón, 33394, España',
      metadataImage: {
        filename: 'universidad.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      }
    };

    let confirmService = fixture.debugElement.injector.get(ConfirmationService);
    spyOn(confirmService, 'confirm').and.callFake((confirmation: Confirmation) => { return confirmation.accept(); });
    component.confirm(activityToRemove);
    fixture.detectChanges();
    expect(component.activities.length).toBe(1);
  });
});
