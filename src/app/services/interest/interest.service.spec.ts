import { TestBed } from '@angular/core/testing';

import { InterestService } from './interest.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('InterestService', () => {
  let service: InterestService;
  let httpTestingController: HttpTestingController;

  const mockInterest =
    [
      {
        id: 1,
        nameInterest: 'Museos'
      },
      {
        id: 2,
        nameInterest: 'Iglesias'
      }
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(InterestService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all interests', () => {
    service.getInterests().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/interest/list');

    expect(req.request.method).toEqual('GET');

    req.flush(mockInterest);
  });

  it('should add a new interest', () => {
    const newInterest = {
      id: 3,
      nameInterest: 'Catedrales'
    }
    service.addInterests(newInterest).subscribe(data => {
      expect(data.nameInterest).toEqual('Catedrales');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/interest/add');

    expect(req.request.method).toEqual('POST');

    req.flush(newInterest);
  });

  it('should delete an interest', () => {
    const interestDelete = {
      id: 1,
      nameInterest: 'Museos'
    };
    service.deleteInterest(interestDelete).subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/interest/delete/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockInterest.filter((interest => interest.id !== 1)));
  });

  it('should delete an interest', () => {
    const interestEdit = {
      id: 1,
      nameInterest: 'Museoss'
    };
    service.editInterest(1, interestEdit).subscribe(data => {
      expect(data.nameInterest).toEqual('Museoss');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/interest/update/1');

    expect(req.request.method).toEqual('PUT');

    req.flush(interestEdit);
  });

  it('should get interest by user', () => {
    const interestByUser = [
      {
        interestID: 1,
        nameInterest: 'Museos',
        priority: 8,
      },
      {
        interestID: 2,
        nameInterest: 'Iglesias',
        priority: 3,
      }
    ];
    service.getInterestByUser(1).subscribe(data => {
      expect(data[0].nameInterest).toEqual('Museos');
      expect(data[0].priority).toEqual(8);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/interest/list/user/1');

    expect(req.request.method).toEqual('GET');

    req.flush(interestByUser);
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
