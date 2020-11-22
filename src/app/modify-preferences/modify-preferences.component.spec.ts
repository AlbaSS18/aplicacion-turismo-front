import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPreferencesComponent } from './modify-preferences.component';

describe('ModifyPreferencesComponent', () => {
  let component: ModifyPreferencesComponent;
  let fixture: ComponentFixture<ModifyPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPreferencesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
