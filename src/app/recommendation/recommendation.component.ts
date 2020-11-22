import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token/token.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  info: any = {};

  constructor(private tokenService: TokenService) { }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthorities()
    };
  }
}
