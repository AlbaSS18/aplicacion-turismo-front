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
import {ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';

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
        RouterTestingModule,
        ConfirmDialogModule,
        ToastModule
      ],
      declarations: [ ListInterestComponent, MenuBarComponent ],
      providers: [
        ConfirmationService,
        MessageService
      ]
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
