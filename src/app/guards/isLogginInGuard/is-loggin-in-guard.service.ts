import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class IsLogginInGuardService implements  Resolve<any>{

  constructor(private router: Router, private tokenService: TokenService) { }

  resolve() {
    if (this.tokenService.getToken())
      this.router.navigate(['/recommendation']);
  }
}
