import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a notification in the array', () => {
    service.success('Actividad añadida', 'La actividad ha sido añadida');
    expect(service.message.length).toBe(1);
  });

  it('should clear the array', () => {
    service.clearService();
    expect(service.message.length).toBe(0);
  });

});
