import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {LocalStorageService} from '../services/local-storage/local-storage.service';
import {PrimeNGConfig} from 'primeng/api';

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
    private router: Router,
    public translate: TranslateService,
    private localStorageService: LocalStorageService,
    private config: PrimeNGConfig
  ) {
  }

  ngOnInit(): void {
    this.email = this.localStorageService.getEmailUser();
    if (this.localStorageService.getToken()){
      this.isLogin = true;
      this.roles = [];
      this.roles = this.localStorageService.getRolesUser();
      if (this.roles.includes("ROLE_ADMIN")){
        this.authority = 'admin';
      }
      else {
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
    this.translate.get('primeng').subscribe(res => this.config.setTranslation(res));
  }

}
