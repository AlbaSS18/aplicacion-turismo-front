import {AuthService} from '../auth/auth.service';
import {UserSignUp} from '../../models/user';
import {Observable, of} from 'rxjs';
import {InterestService} from './interest.service';
import {Interest} from '../../models/interest';

export class MockInterestService extends InterestService{

  interestList = [
    {
      id: 1,
      nameInterest: 'Museos'
    },
    {
      id: 2,
      nameInterest: 'Iglesias'
    }
  ]

  getInterests(): Observable<Interest[]> {
    return of(this.interestList);
  }
}
