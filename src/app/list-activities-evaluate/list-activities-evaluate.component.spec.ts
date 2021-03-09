import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActivitiesEvaluateComponent } from './list-activities-evaluate.component';

describe('ListActivitiesEvaluateComponent', () => {
  let component: ListActivitiesEvaluateComponent;
  let fixture: ComponentFixture<ListActivitiesEvaluateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListActivitiesEvaluateComponent ]
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
