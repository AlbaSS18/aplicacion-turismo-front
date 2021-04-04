import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserComponent } from './list-user.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {ConfirmationService, MessageService} from 'primeng/api';
import {RouterTestingModule} from '@angular/router/testing';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {ToastModule} from 'primeng/toast';
import {User} from '../models/user';
import {UserService} from '../services/user/user.service';
import {MockUserService} from '../services/user/user-service-mock';

describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserComponent, MenuBarComponent ],
      imports: [
        HttpClientTestingModule,
        ToolbarModule,
        TableModule,
        RouterTestingModule,
        TabViewModule,
        ConfirmDialogModule,
        TranslateModule.forRoot(),
        ToastModule
      ],
      providers: [
        ConfirmationService,
        MessageService,
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return all users', () => {
    expect(component.users.length).toBe(1);
  });

  it('should add a user', () => {
    const newUser: User = {
      id: 1,
      userName: 'test',
      email: 'test@email.com',
      dateBirthday: new Date(),
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    };
    component.users.push(newUser);
    expect(component.users.length).toBe(2);
  });

  it('should remove the user', () => {
    const newUser: User = {
      id: 1,
      userName: 'test',
      email: 'test@email.com',
      dateBirthday: new Date(),
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    };
    component.confirmDelete(newUser);
    expect(component.users.length).toBe(1);
  });





});
