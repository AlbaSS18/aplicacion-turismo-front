import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationActivitiesComponent } from './information-activities.component';
import {DynamicDialogConfig, DynamicDialogRef} from 'primeng/dynamicdialog';

describe('InformationActivitiesComponent', () => {
  let component: InformationActivitiesComponent;
  let fixture: ComponentFixture<InformationActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformationActivitiesComponent ],
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
