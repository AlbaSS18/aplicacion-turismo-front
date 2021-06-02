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
import {CalendarModule} from 'primeng/calendar';
import {MockUserService} from '../services/user/user-service-mock';
import {RolService} from '../services/rol/rol.service';
import {MockRolService} from '../services/rol/rol-service-mock';
import {ListboxModule} from 'primeng/listbox';
import {of} from 'rxjs';
import {ActivatedRoute, convertToParamMap, Router} from '@angular/router';

describe('EditUserAdminComponent', () => {
  let component: EditUserAdminComponent;
  let fixture: ComponentFixture<EditUserAdminComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserAdminComponent, MenuBarComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        DropdownModule,
        RouterTestingModule,
        FormsModule,
        TranslateModule.forRoot(),
        ButtonModule,
        ToastModule,
        CalendarModule,
        ListboxModule
      ],
      providers: [
        MessageService,
        {provide: UserService, useClass: MockUserService},
        {provide: RolService, useClass: MockRolService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the roles', () => {
    expect(component.roles.length).toBe(2);
  });

  it('should load the user', () => {
    const user = {
      id: 1,
      dateBirthday: new Date('1998-12-18T00:00:00.000+00:00'),
      email: 'alba@email.com',
      userName: 'Admin',
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      interest:
        [
          {
            interestID: 2,
            nameInterest: 'Playas',
            priority: 0
          },
          {
            interestID: 155,
            nameInterest: 'Prueba',
            priority: 0
          }
        ]
    }
    expect(component.user).toEqual(user);
  });

  it('should send the form', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editUserForm.controls['dateBirthday'].setValue(new Date('1998-12-17'));
    component.editUserForm.controls['roles'].setValue(['ROLE_USER']);
    component.editUserForm.controls['userName'].setValue('Administrador');

    component.sendForm();

    setTimeout(() => {
      expect(navigateSpy).toHaveBeenCalledTimes(1);
      expect(navigateSpy).toHaveBeenCalledWith(['/user']);
    }, 251);

  });

  it('should compare json that are the different', () => {
    const json1 = {
      dateBirthday: "1998-12-18T00:00:00.000+00:00",
      email: "alba@email.com",
      id: 1,
      interest: [
        {
          interestID: 1, nameInterest: "Museos", priority: 5
        },
        {
          interestID: 2, nameInterest: "Playas", priority: 0
        }
      ],
      roles: ["ROLE_USER", "ROLE_ADMIN"],
      userName: "Alba"
    };

    const json2 = {
      dateBirthday: new Date('1998-12-16'),
      roles: ["ROLE_USER"],
      userName: "Alba Serena"
    };

    component.isEquivalent(json1, json2);
    expect(component.valueUnchanged).toBeFalse();
  });

  it('should compare json that are the same', () => {
    const json1 = {
      dateBirthday: "1998-12-18T00:00:00.000+00:00",
      email: "alba@email.com",
      id: 1,
      interest: [
        {
          interestID: 1, nameInterest: "Museos", priority: 5
        },
        {
          interestID: 2, nameInterest: "Playas", priority: 0
        }
      ],
      roles: ["ROLE_USER", "ROLE_ADMIN"],
      userName: "Alba"
    };

    const json2 = {
      dateBirthday: new Date('1998-12-18'),
      roles: ["ROLE_ADMIN", "ROLE_USER"],
      userName: "Alba"
    };

    component.isEquivalent(json1, json2);
    expect(component.valueUnchanged).toBeTrue();
  });
});
