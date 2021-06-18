import { TestBed } from '@angular/core/testing';

import { RolService } from './rol.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('RolService', () => {
  let service: RolService;
  let httpTestingController: HttpTestingController;

  const mockRoles = [
    {
      id: 1,
      rolName: 'ROLE_ADMIN'
    },
    {
      id: 2,
      rolName: 'ROLE_USER'
    }
  ]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RolService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all roles', () => {
    service.getRoles().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/rol/list');

    expect(req.request.method).toEqual('GET');

    req.flush(mockRoles);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
