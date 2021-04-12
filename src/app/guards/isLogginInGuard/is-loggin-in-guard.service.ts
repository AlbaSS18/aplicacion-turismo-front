import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class IsLogginInGuardService implements Resolve<any>{

  constructor(private router: Router, private localStorageService: LocalStorageService) { }

  resolve() {
    if (this.localStorageService.getToken()) {
      const roles = this.localStorageService.getRolesUser();
      if (roles.includes("ROLE_ADMIN")){
        this.router.navigate(['/user']);
      }
      else{
        this.router.navigate(['/recommendationMap']);
      }
    }
  }
}
