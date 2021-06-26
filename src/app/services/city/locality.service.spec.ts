import { TestBed } from '@angular/core/testing';

import { LocalityService } from './locality.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('LocalityService', () => {
  let service: LocalityService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LocalityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
