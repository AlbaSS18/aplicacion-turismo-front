import { TestBed } from '@angular/core/testing';

import { RoleGuardService } from './role-guard.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('RoleGuardService', () => {
  let service: RoleGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(RoleGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
