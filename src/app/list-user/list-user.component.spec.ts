import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserComponent } from './list-user.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';
import {RouterTestingModule} from '@angular/router/testing';
import {TabViewModule} from 'primeng/tabview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {ToastModule} from 'primeng/toast';
import {User} from '../models/user';
import {UserService} from '../services/user/user.service';
import {MockUserService} from '../services/user/user-service-mock';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;
  let localService: LocalStorageService;

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
        {provide: UserService, useClass: MockUserService},
        LocalStorageService
      ]
    })
    .compileComponents();

    localService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    spyOn(localService, 'getEmailUser').and.returnValue('alba@email.com');
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

  it('should remove the user', () => {
    let confirmService = fixture.debugElement.injector.get(ConfirmationService);
    spyOn(confirmService, 'confirm').and.callFake((confirmation: Confirmation) => { return confirmation.accept(); });
    const deleteUser: User = {
      id: 1,
      userName: 'Admin',
      email: 'admin@email.com',
      dateBirthday: new Date('1998-12-18T00:00:00.000+00:00'),
      roles: ['ROLE_ADMIN', 'ROLE_USER']
    };
    component.confirmDelete(deleteUser);
    expect(component.users.length).toBe(0);
  });





});
