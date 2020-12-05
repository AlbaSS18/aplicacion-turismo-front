import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {TokenService} from '../services/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: [
    './menu-bar.component.scss'
  ],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[];
  isLogin = false;

  constructor(
    private tokenService: TokenService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()){
      this.isLogin = true;
    }
    this.items = [
      {
        label: 'Idioma',
        icon: 'fas fa-globe',
        items: [
          {label: 'Español'},
          {label: 'Inglés' }
        ],
      },
      {
        label: 'Usuarios',
        icon: 'fas fa-users',
        routerLink: '/user'
      },
      {
        label: 'Ciudades',
        icon: 'fas fa-city',
        routerLink: '/cities'
      },
      {
        label: 'Actividades',
        icon: 'fas fa-map-marked-alt',
        routerLink: '/activities'
      },
      {
        label: 'Interés',
        icon: 'fas fa-camera',
        routerLink: '/interest'
      },
      {
        label: 'Logout',
        icon: 'fas fa-sign-out-alt'
      }
    ];
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.router.navigateByUrl('/login');
  }

}
