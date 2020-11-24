import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitiesComponent } from './list-cities.component';
import {DialogModule} from 'primeng/dialog';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

describe('ListCitiesComponent', () => {
  let component: ListCitiesComponent;
  let fixture: ComponentFixture<ListCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogModule,
        VirtualScrollerModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [ ListCitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
