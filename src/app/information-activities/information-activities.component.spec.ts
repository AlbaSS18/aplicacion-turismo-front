import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationActivitiesComponent } from './information-activities.component';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {HttpClientTestingModule} from '@angular/common/http/testing';

fdescribe('InformationActivitiesComponent', () => {
  let component: InformationActivitiesComponent;
  let fixture: ComponentFixture<InformationActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationActivitiesComponent ],
      imports: [
        TranslateModule.forRoot(),
        ButtonModule,
        HttpClientTestingModule
      ],
      providers: [
        DynamicDialogRef,
        DynamicDialogConfig
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
