import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCitiesComponent } from './list-cities.component';
import {DialogModule} from 'primeng/dialog';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

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
        CardModule,
        ButtonModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ToastModule,
        ConfirmDialogModule
      ],
      declarations: [ ListCitiesComponent, MenuBarComponent ],
      providers: [
        ConfirmationService,
        MessageService
      ]
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
