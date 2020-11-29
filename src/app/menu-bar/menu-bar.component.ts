import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.scss'],
})
export class MenuBarComponent implements OnInit {
  items: MenuItem[];

  constructor() { }

  ngOnInit(): void {
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
      }
    ];
  }

}
