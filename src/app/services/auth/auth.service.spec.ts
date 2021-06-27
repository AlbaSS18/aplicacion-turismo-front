import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;

  const mockUsers = [];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should signup a user', () => {
    const newUser = {
      userName: 'Alba',
      email: 'alba@email.com',
      dateBirthday: '18-12-1998',
      password: '1234567',
      passwordConfirm: '1234567',
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      interest: [
        {
          nameInterest: 'Museo',
          priority: 5
        }
      ]
    }
    service.signUp(newUser).subscribe(data => {
      expect(data.userName).toBe('Alba');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/auth/signup');

    expect(req.request.method).toEqual('POST');

    req.flush(newUser);
  });

  it('should login a user', () => {
    const user = {
      email: 'alba@email.com',
      password: '1234567'
    }
    service.login(user).subscribe(data => {
      expect(data.token).toEqual('LjRTDS_==hD');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/auth/login');

    expect(req.request.method).toEqual('POST');

    req.flush({
      token: 'LjRTDS_==hD'
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
