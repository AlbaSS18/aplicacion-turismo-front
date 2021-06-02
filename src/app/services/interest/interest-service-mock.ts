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

  addInterests(interest): Observable<any> {
    var interestToAdd = {
      id: this.interestList[this.interestList.length - 1].id + 1,
      nameInterest: interest.nameInterest
    }
    this.interestList.push(interestToAdd);
    return of({
      mensaje: 'El interés ha sido añadido'
    });
  }

  deleteInterest(interest): Observable<any> {
    this.interestList = this.interestList.filter(p => p.id !== interest.id);
    return of({
      mensaje: 'El interés ha sido eliminado'
    });
  }

  editInterest(id, interest): Observable<any> {
    const updateItem = this.interestList.find(inter => inter.id === id);
    const index = this.interestList.indexOf(updateItem);

    var interestToEdit = {
      id: id,
      nameInterest: interest.nameInterest
    }
    this.interestList[index] = interestToEdit;

    return of({
      mensaje: 'El interés ha sido editado'
    });
  }
}
