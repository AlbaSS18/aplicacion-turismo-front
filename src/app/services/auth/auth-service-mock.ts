import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {UserSignUp} from '../../models/user';

export class MockAuthService extends AuthService{
  signUp(user: UserSignUp): Observable<any> {
    return of();
  }
}
