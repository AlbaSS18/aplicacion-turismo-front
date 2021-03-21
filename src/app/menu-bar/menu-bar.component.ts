import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TokenService} from '../services/token/token.service';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: [
    './menu-bar.component.scss'
  ],
})
export class MenuBarComponent implements OnInit {
  isLogin = false;
  roles: string[];
  authority: string;
  email;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    public translate: TranslateService,
    private localStorageService: LocalStorageService
  ) {
  }

  ngOnInit(): void {
    this.email = this.tokenService.getEmailUser();
    if (this.localStorageService.getToken()){
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getRolesUser();
      if (this.roles.includes("ROLE_ADMIN")){
        this.authority = 'admin';
      }
      else{
        this.authority = 'user';
      }
    }
  }

  logOut(): void {
    this.localStorageService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigateByUrl('/login');
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

}
