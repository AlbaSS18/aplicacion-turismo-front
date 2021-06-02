import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponent } from './edit-user.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {InputNumberModule} from 'primeng/inputnumber';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterModule} from '@angular/router';
import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {UserService} from '../services/user/user.service';
import {MockUserService} from '../services/user/user-service-mock';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;
  let localService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserComponent, MenuBarComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
        ButtonModule,
        MessagesModule,
        InputNumberModule,
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        DropdownModule,
        CalendarModule
      ],
      providers: [
        {provide: UserService, useClass: MockUserService}
      ]
    })
    .compileComponents();

    localService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    spyOn(localService, 'getEmailUser').and.returnValue('alba@email.com');
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should compare json that are different', () => {
    const json1 = {
      dateBirthday: "1998-12-18T00:00:00.000+00:00",
      email: "admin@email.com",
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
      userName: "Admin"
    };
    const json2 = {
      dateBirthday: new Date('1998-5-4'),
      interest: [
        {
          interestID: 1, nameInterest: "Museos", priority: 4
        },
        {
          interestID: 2, nameInterest: "Playas", priority: 9
        }
      ],
      userName: "Administrador"
    };
    component.isEquivalent(json1, json2);
    expect(component.valueUnchanged).toBeFalse();
  });

  it('should compare json that are same', () => {
    const json1 = {
      dateBirthday: "1998-12-18T00:00:00.000+00:00",
      email: "admin@email.com",
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
      userName: "Admin"
    };
    const json2 = {
      dateBirthday: new Date('1998-12-18'),
      interest: [
        {
          interestID: 1, nameInterest: "Museos", priority: 5
        },
        {
          interestID: 2, nameInterest: "Playas", priority: 0
        }
      ],
      userName: "Admin"
    };
    component.isEquivalent(json1, json2);
    expect(component.valueUnchanged).toBeTrue();
  });

  it('should get the user', () => {
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

  it('should update the user', () => {
    component.editUserProfile.controls['dateBirthday'].setValue(new Date('1998-12-17'));
    component.editUserProfile.controls['userName'].setValue('Alba Serena');
    component.editUserProfile.controls['interest'].setValue([
      {
        interestID: 2,
        nameInterest: 'Playas',
        priority: 6
      },
      {
        interestID: 155,
        nameInterest: 'Prueba',
        priority: 2
      }
    ]);
    component.updateUserProfile();
    expect(component.valueUnchanged).toBeTrue();

    const userEdited = {
      id: 1,
      dateBirthday: '1998-12-17',
      email: 'alba@email.com',
      userName: 'Alba Serena',
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
      interest:
        [
          {
            interestID: 2,
            nameInterest: 'Playas',
            priority: 6
          },
          {
            interestID: 155,
            nameInterest: 'Prueba',
            priority: 2
          }
        ]
    }
    expect(component.user).toEqual(userEdited);
  });
});
