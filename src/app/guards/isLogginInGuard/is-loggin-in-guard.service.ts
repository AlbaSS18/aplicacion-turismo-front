import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';

@Injectable({
  providedIn: 'root'
})
export class IsLogginInGuardService implements Resolve<any>{

  constructor(private router: Router, private tokenService: TokenService) { }

  resolve() {
    if (this.tokenService.getToken()) {
      const roles = this.tokenService.getAuthorities();
      if (roles.includes("ROLE_ADMIN")){
        console.log("e")
        this.router.navigate(['/user']);
      }
      else{
        this.router.navigate(['/recommendation']);
      }
    }
  }
}
