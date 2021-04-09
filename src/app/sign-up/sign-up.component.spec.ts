import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {ButtonModule} from 'primeng/button';
import {MessageService} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {PasswordModule} from 'primeng/password';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';
import {AuthService} from '../services/auth/auth.service';
import {MockAuthService} from '../services/auth/auth-service-mock';
import {InterestService} from '../services/interest/interest.service';
import {MockInterestService} from '../services/interest/interest-service-mock';

fdescribe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent, MenuBarComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        InputNumberModule,
        DropdownModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        ButtonModule,
        CalendarModule,
        PasswordModule
      ],
      providers: [
        {provide: AuthService, useClass: MockAuthService},
        {provide: InterestService, useClass: MockInterestService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid the form when empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  it('should be valid the email field', () => {
    let name = component.formGroup.get('name');
    expect(name.valid).toBeFalsy();
  });

  fit('should submit the form', () => {
    expect(component.formGroup.valid).toBeFalsy();
    component.formGroup.controls['name'].setValue('Unit test');
    component.formGroup.controls['email'].setValue('unitTest@email.com');
    component.formGroup.controls['dateBirthday'].setValue(new Date('1998-07-18'));
    component.formGroup.controls['password'].setValue('1234567');
    component.formGroup.controls['repeatPassword'].setValue('1234567');
    component.formGroup.controls['interest'].setValue([
      {
        nameInterest: 'Museos',
        priority: 5
      },
      {
        nameInterest: 'Iglesias',
        priority: 5
      }
    ]);

    component.onSubmit();

    expect(component.isRegisterFail).toBe(false);
  });
});
