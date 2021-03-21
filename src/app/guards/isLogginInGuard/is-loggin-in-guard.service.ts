import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {TokenService} from '../../services/token/token.service';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsLogginInGuardService implements Resolve<any>{

  constructor(private router: Router, private localStorageService: LocalStorageService, private tokenService: TokenService) { }

  resolve() {
    if (this.localStorageService.getToken()) {
      const roles = this.tokenService.getRolesUser();
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
