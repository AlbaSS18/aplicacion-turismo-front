import { TestBed } from '@angular/core/testing';

import { InterestService } from './interest.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('InterestService', () => {
  let service: InterestService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InterestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
