import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterestComponent } from './list-interest.component';

describe('ListInterestComponent', () => {
  let component: ListInterestComponent;
  let fixture: ComponentFixture<ListInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListInterestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
