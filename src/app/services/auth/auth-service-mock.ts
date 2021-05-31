import {AuthService} from './auth.service';
import {Observable, of} from 'rxjs';
import {UserLogin, UserSignUp} from '../../models/user';
import {JwtModel} from '../../models/jwt_model';

export class MockAuthService extends AuthService{

  signUp(user: UserSignUp): Observable<any> {
    return of({
      mensaje: 'Usuario añadido'
    });
  }

  login(user: UserLogin): Observable<JwtModel> {
    if (user.email === "alba@email.com" ){
      return of({
        token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJST0xFUyI6IlJPTEVfVVNFUiIsImlhdCI6MTYxOTYyNjg0NSwiZXhwIjoxNjE5NjMwNDQ1fQ.G9Lo7n_qFYlwN6QUSijFO-REsPft5VvaFlgHKTOFmvphx20NL7b1-8d8-GidTd2a_UhHDHlVjHV6LdIGGa2gTw'
      });
    }
    else{
      return of({
        token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBlbWFpbC5jb20iLCJST0xFUyI6IlJPTEVfQURNSU4sUk9MRV9VU0VSIiwiaWF0IjoxNjE5NjI2ODQ1LCJleHAiOjE2MTk2MzA0NDV9.pl_Io9pBx38Yl2jUZXB4UabZFix64n657neG7fHteN3DguhTp_IgUOze0PabMk55bnW9dftQbsBTdWjQFhHDkQ'
      });
    }

  }
}
