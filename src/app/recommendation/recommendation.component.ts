import { Component, OnInit } from '@angular/core';
import {InterestService} from '../services/interest/interest.service';
import {Interest} from '../models/interest';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss']
})
export class RecommendationComponent implements OnInit {

  info: any = {};
  numberRecommendations: number = 0;
  typeselected: any[];
  interestList: Interest[] = [];

  constructor(private interestService: InterestService, private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.info = {
      token: this.localStorageService.getToken(),
      nombreUsuario: this.localStorageService.getEmailUser(),
      authorities: this.localStorageService.getRolesUser()
    };
    this.interestService.getInterests().subscribe(
      interestList => {
        this.interestList = interestList;
      }
    );
  }
}
