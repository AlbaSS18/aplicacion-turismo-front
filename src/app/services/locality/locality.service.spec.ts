import { TestBed } from '@angular/core/testing';

import { LocalityService } from './locality.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('LocalityService', () => {
  let service: LocalityService;
  let httpTestingController: HttpTestingController;

  const mockLocalities =
    [
      {
        id: 1,
        name: 'Gijón'
      },
      {
        id: 2,
        name: 'Avilés'
      }
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(LocalityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all localities', () => {
    service.getLocalities().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/locality/list');

    expect(req.request.method).toEqual('GET');

    req.flush(mockLocalities);
  });

  it('should add a new locality', () => {
    const newLocality = {
      id: 3,
      name: 'Oviedo'
    }
    service.addLocality(newLocality).subscribe(data => {
      expect(data).toEqual(newLocality);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/locality/add');

    expect(req.request.method).toEqual('POST');

    req.flush(newLocality);
  });

  it('should delete a locality', () => {
    const localityDelete = {
      id: 1,
      nameInterest: 'Gijón'
    };
    service.deleteLocality(localityDelete).subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/locality/delete/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockLocalities.filter((locality => locality.id !== 1)));
  });

  it('should edit an interest', () => {
    const localityEdit = {
      id: 1,
      name: 'Gijonn'
    };
    service.editLocality(1, localityEdit).subscribe(data => {
      expect(data.name).toEqual('Gijonn');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/locality/update/1');

    expect(req.request.method).toEqual('PUT');

    req.flush(localityEdit);
  });


  afterEach(() => {
    httpTestingController.verify();
  });
});
