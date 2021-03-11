import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationMapComponent } from './recommendation-map.component';

describe('RecommendationMapComponent', () => {
  let component: RecommendationMapComponent;
  let fixture: ComponentFixture<RecommendationMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendationMapComponent ]
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
