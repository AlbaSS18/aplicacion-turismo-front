import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPreferencesComponent } from './modify-preferences.component';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule, TranslateService} from '@ngx-translate/core';

xdescribe('ModifyPreferencesComponent', () => {
  let component: ModifyPreferencesComponent;
  let fixture: ComponentFixture<ModifyPreferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyPreferencesComponent, MenuBarComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
      ],
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
