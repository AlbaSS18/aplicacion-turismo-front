
import {RolService} from './rol.service';
import {Rol} from '../../models/rol';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';

@Injectable()
export class MockRolService extends RolService{

  roles = [
    {
      id: 1,
      rolName: 'ROLE_ADMIN'
    },
    {
      id: 2,
      rolName: 'ROLE_USER'
    }
  ]

  getRoles(): Observable<Rol[]> {
    return of(this.roles);
  }
}
