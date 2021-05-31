import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {TranslateModule} from '@ngx-translate/core';
import {MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {PasswordModule} from 'primeng/password';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';
import {AuthService} from '../services/auth/auth.service';
import {MockAuthService} from '../services/auth/auth-service-mock';
import {Router} from '@angular/router';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let localService: LocalStorageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent, MenuBarComponent ],
      imports: [
        ButtonModule,
        InputTextModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateModule.forRoot(),
        MessagesModule,
        PasswordModule
      ],
      providers: [
        MessageService,
        {provide: AuthService, useClass: MockAuthService},
        LocalStorageService
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    localService = TestBed.inject(LocalStorageService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should login a user with role admin and user', () => {
    component.loginForm.controls['email'].setValue('admin@email.com');
    component.loginForm.controls['password'].setValue('1234567');
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(localService, 'setToken').and.returnValue(null);
    spyOn(localService, 'getRolesUser').and.returnValue(["ROLE_ADMIN", "ROLE_USER"]);
    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/user']);
  });

  it('should login a user with role user', () => {
    component.loginForm.controls['email'].setValue('alba@email.com');
    component.loginForm.controls['password'].setValue('1234567');
    const navigateSpy = spyOn(router, 'navigate');
    spyOn(localService, 'setToken').and.returnValue(null);
    spyOn(localService, 'getRolesUser').and.returnValue(["ROLE_USER"]);
    component.onSubmit();

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/recommendationMap']);
  });
});
