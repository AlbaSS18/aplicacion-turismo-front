import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-list-activities-evaluate',
  templateUrl: './list-activities-evaluate.component.html',
  styleUrls: ['./list-activities-evaluate.component.scss']
})
export class ListActivitiesEvaluateComponent implements OnInit {

  listActivities = [];
  sortOptions: SelectItem[];

  constructor() { }

  ngOnInit(): void {
    this.sortOptions = [
      {label: 'Rating High to Low', value: '!rating'},
      {label: 'Rating Low to High', value: 'rating'}
  ];
    this.listActivities = [
      {
        name: "Museos de Gijón",
        description: "Museo de Gijón que se encuentra en Gijón",
        interest: "Museos",
        address: "Calle Laboratorios",
        rating: "3"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        interest: "Catedral",
        address: "Calle Laboratorios",
        rating: "2"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        interest: "Catedral",
        address: "Calle Laboratorios",
        rating: "1"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        interest: "Catedral",
        address: "Calle Laboratorios",
        rating: "0"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        interest: "Catedral",
        address: "Calle Laboratorios",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        interest: "Catedral",
        address: "Calle Laboratorios",
        rating: "5"
      },
      {
        name: "Catedral de Sevilla",
        description: "Catedral muy bonita que se encuentra en Sevilla",
        interest: "Catedral",
        address: "Calle Laboratorios",
        rating: "5"
      }
    ];
  }

}
