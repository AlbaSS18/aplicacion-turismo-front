import { TestBed } from '@angular/core/testing';

import { IsLogginInGuardService } from './is-loggin-in-guard.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('IsLogginInGuardService', () => {
  let service: IsLogginInGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ]
    });
    service = TestBed.inject(IsLogginInGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
