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
    },
    {
      id: 2,
      dateBirthday: new Date('1998-12-18T00:00:00.000+00:00'),
      email: 'alba@email.com',
      userName: 'Alba',
      roles: ['ROLE_USER'],
    }
  ];

  user = {
    id: 1,
    dateBirthday: new Date('1998-12-18T00:00:00.000+00:00'),
    email: 'alba@email.com',
    userName: 'Admin',
    roles: ['ROLE_USER', 'ROLE_ADMIN'],
    interest:
      [
        {
          interestID: 2,
          nameInterest: 'Playas',
          priority: 0
        },
        {
          interestID: 155,
          nameInterest: 'Prueba',
          priority: 0
        }
      ]
  }

  getUsers(): Observable<User[]> {
    return of(this.listUsers);
  }

  deleteUser(id): Observable<any> {
    this.listUsers = this.listUsers.filter(us => us.id !== id);
    return of({
      mensaje: 'El usuario se ha eliminado'
    });
  }

  getUser(id): Observable<User> {
    return of(this.user);
  }

  editUser(id, user): Observable<any> {
    this.user.dateBirthday = user.dateBirthday;
    this.user.interest = user.interest;
    this.user.roles = user.roles;
    this.user.userName = user.userName;
    return of({
      mensaje: 'El usuario ha sido modificado'
    });
  }


}
