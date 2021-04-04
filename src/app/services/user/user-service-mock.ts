import {UserService} from './user.service';
import {Observable, of} from 'rxjs';
import {User} from '../../models/user';
import {Injectable} from '@angular/core';

@Injectable()
export class MockUserService extends UserService {

  listUsers = [
    {
      id: 1,
      dateBirthday: new Date('1998-12-18T00:00:00.000+00:00'),
      email: 'admin@email.com',
      userName: 'Admin',
      roles: ['ROLE_USER', 'ROLE_ADMIN'],
    }
  ];

  getUsers(): Observable<User[]> {
    return of(this.listUsers);
  }

  deleteUser(id): Observable<any> {
    return of();
  }


}
