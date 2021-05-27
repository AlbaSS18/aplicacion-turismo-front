import {TestBed} from '@angular/core/testing';

import {ActivityService} from './activity.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

fdescribe('ActivityService', () => {
  let service: ActivityService;
  let httpTestingController: HttpTestingController;

  const mockActivities =
    [
      {
        id: 1,
        name: 'Museo del ferrocarril',
        description: 'Es un museo de Gijón',
        latitude: 5.90,
        longitude: 49.89,
        pathImage: 'ferrocarril.jpg',
        city: 'Gijón',
        interest: 'Museo',
        address: 'Plaza Estación del Nte., s/n, 33212 Gijón, Asturias',
        metadataImage: {
          filename: 'ferrocarril.jpg',
          mimeType: 'image/jpg',
          data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k='
        }
      },
      {
        id: 2,
        name: 'Catedral de Oviedo',
        description: 'Es una catedral de Oviedo',
        latitude: 5.20,
        longitude: 48.89,
        pathImage: 'catedral-oviedo.jpg',
        city: 'Oviedo',
        interest: 'Iglesia',
        address: 'Pl. Alfonso II el Casto, s/n, 33003 Oviedo, Asturias',
        metadataImage: {
          filename: 'catedral-oviedo.jpg',
          mimeType: 'image/jpg',
          data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k='
        }
      }
    ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ActivityService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all activities', () => {
    service.getActivities().subscribe(data => {
      expect(data.length).toBe(2);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/list');

    expect(req.request.method).toEqual('GET');

    req.flush(mockActivities);
  });

  it('should get the activity', () => {

    service.getActivity(1).subscribe(activity => {
      expect(activity).toEqual(mockActivities[0]);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/details/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockActivities[0]);

  });

  it('should delete an activity', () => {

    service.deleteActivity(1).subscribe(data => {
      expect(data.length).toBe(1);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/delete/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockActivities.filter(act => act.id !== 1));
  });

  it('should edit an activity', () => {

    const actityEdit = {
      id: 1,
      name: 'Ferrocarril',
      description: 'Es un museo de Gijón',
      latitude: 5.90,
      longitude: 49.89,
      pathImage: 'ferrocarril.jpg',
      city: 'Gijón',
      interest: 'Museo',
      address: 'Plaza Estación del Nte., s/n, 33212 Gijón, Asturias',
      metadataImage: {
        filename: 'ferrocarril.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k='
      }
    };

    service.editActivity(1, actityEdit).subscribe((data) => {
      expect(data.name).toBe('Ferrocarril');
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/update/1');

    expect(req.request.method).toEqual('PUT');

    req.flush(actityEdit);
  });

  it('should rate an activity', () => {

    const actityEdit = {
      activity_id: 1,
      email_user: 'alba@gmail.com',
      rate: 5
    };

    service.postRateActivity(actityEdit).subscribe((data) => {
      expect(data).toBe(actityEdit);
    });

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/rate');

    expect(req.request.method).toEqual('POST');

    req.flush(actityEdit);
  });

  it('should get recommendation activity by user', () => {

    const ratedActivities = [...mockActivities];
    ratedActivities[0]['score'] = 5;
    ratedActivities[0]['average'] = 1.999999;
    ratedActivities[1]['score'] = 4;
    ratedActivities[1]['average'] = 0.655555;

    service.getRecommendedActivities(1).subscribe((data => {
      expect(ratedActivities[0]['score']).toBe(5);
      expect(ratedActivities[1]['score']).toBe(4);

      expect(ratedActivities[0]['average']).toBe(1.999999);
      expect(ratedActivities[1]['average']).toBe(0.655555);
    }));

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/recommedation/1');

    expect(req.request.method).toEqual('GET');

    req.flush(ratedActivities);
  });

  it('should get rated activity by user', () => {
    const ratedActivities = [
      {
        id: 1,
        name: 'Museo del ferrocarril',
        description: 'Es un museo de Gijón',
        latitude: 5.90,
        longitude: 49.89,
        pathImage: 'ferrocarril.jpg',
        city: 'Gijón',
        interest: 'Museo',
        address: 'Plaza Estación del Nte., s/n, 33212 Gijón, Asturias',
        metadataImage: {
          filename: 'ferrocarril.jpg',
          mimeType: 'image/jpg',
          data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k='
        },
        score: 4,
        average: 3.6
      }
    ]

    service.getRatedActivities(1).subscribe((data => {
      expect(ratedActivities.length).toBe(1);
    }));

    const req = httpTestingController.expectOne('http://localhost:8090/api/activity/ratedActivities/1');
    expect(req.request.method).toEqual('GET');

    req.flush(ratedActivities);
  });


  afterEach(() => {
    httpTestingController.verify();
  });
});
