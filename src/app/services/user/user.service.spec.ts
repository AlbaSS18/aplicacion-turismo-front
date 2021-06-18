import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  const mockUsers =
    [
      {
        id: 1,
        userName: 'Luis',
        email: 'luis@email.com',
        dateBirthday: new Date('1998-07-12'),
        roles: ['ROLE_ADMIN', 'ROLE_USER']
      },
      {
        id: 2,
        userName: 'Alba',
        email: 'alba@email.com',
        dateBirthday: new Date('1956-12-1'),
        roles: ['ROLE_USER']
      }
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {
    service.getUsers().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/user/list');

    expect(req.request.method).toEqual('GET');

    req.flush(mockUsers);
  });

  it('should get the user with id 1', () => {
    service.getUser(1).subscribe(data => {
      expect(data.id).toBe(1);
      expect(data.userName).toEqual('Luis');
      expect(data.email).toEqual('luis@email.com');
      expect(data.dateBirthday.getTime()).toBe(new Date('1998-07-12').getTime());
      expect(data.roles[0]).toBe('ROLE_ADMIN');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/user/details/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockUsers[0]);
  });

  it('should edit a user', () => {

    const userEdit = {
        id: 1,
        userName: 'LuisAdmin',
        email: 'luis@email.com',
        dateBirthday: new Date('1998-07-12'),
        roles: ['ROLE_ADMIN', 'ROLE_USER']
    };

    service.editUser(1, userEdit).subscribe(data => {
      expect(data.userName).toEqual('LuisAdmin');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/user/update/1');

    expect(req.request.method).toEqual('PUT');

    req.flush(userEdit);
  });

  it('should delete a user', () => {

    service.deleteUser(1).subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/user/delete/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockUsers.filter((user => user.id !== 1)));
  });

  afterEach(() => {
    httpTestingController.verify();
  });

});
