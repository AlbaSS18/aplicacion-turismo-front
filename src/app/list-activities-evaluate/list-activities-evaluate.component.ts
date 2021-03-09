import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-activities-evaluate',
  templateUrl: './list-activities-evaluate.component.html',
  styleUrls: ['./list-activities-evaluate.component.scss']
})
export class ListActivitiesEvaluateComponent implements OnInit {

  listActivities = [];

  constructor() { }

  ngOnInit(): void {
    this.listActivities = [
      {
        name: "Museos de Gijón",
        description: "Museo de Gijón que se encuentra en Gijón",
        rating: "3"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        rating: "5"
      }
    ];
  }

}
