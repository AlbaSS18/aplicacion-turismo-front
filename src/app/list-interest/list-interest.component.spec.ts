import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterestComponent } from './list-interest.component';
import {DialogModule} from 'primeng/dialog';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListInterestComponent', () => {
  let component: ListInterestComponent;
  let fixture: ComponentFixture<ListInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogModule,
        VirtualScrollerModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ButtonModule,
        CardModule,
        RouterTestingModule
      ],
      declarations: [ ListInterestComponent, MenuBarComponent ]
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
