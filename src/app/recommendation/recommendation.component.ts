import { Component, OnInit } from '@angular/core';
import {TokenService} from '../services/token/token.service';
import {InterestService} from '../services/interest/interest.service';
import {Interest} from '../models/interest';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  info: any = {};
  numberRecommendations: number = 0;
  typeselected: string[] = [];
  interestList: Interest[] = [];
  

  constructor(private tokenService: TokenService, private interestService: InterestService) { }

  ngOnInit() {
    this.info = {
      token: this.tokenService.getToken(),
      nombreUsuario: this.tokenService.getEmail(),
      authorities: this.tokenService.getAuthorities()
    };
    this.interestService.getInterests().subscribe(
      interestList => {
        this.interestList = interestList;
      }
    );
  }
}
