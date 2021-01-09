import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserAdminComponent } from './edit-user-admin.component';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {UserService} from '../services/user/user.service';
import {MessageService} from 'primeng/api';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';

describe('EditUserAdminComponent', () => {
  let component: EditUserAdminComponent;
  let fixture: ComponentFixture<EditUserAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserAdminComponent, MenuBarComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        InputNumberModule,
        DropdownModule,
        RouterTestingModule,
        FormsModule,
        TranslateModule.forRoot(),
        ButtonModule,
        ToastModule
      ],
      providers: [
        UserService,
        MessageService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
