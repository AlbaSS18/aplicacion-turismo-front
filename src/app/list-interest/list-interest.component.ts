import { Component, OnInit } from '@angular/core';
import {InterestService} from '../services/interest/interest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService} from 'primeng/api';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-list-interest',
  templateUrl: './list-interest.component.html',
  styleUrls: ['./list-interest.component.scss']
})
export class ListInterestComponent implements OnInit {

  interest;
  display: boolean = false;
  formAddInterest: FormGroup;

  constructor(
    private interestService: InterestService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.formAddInterest = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.loadInterest();
  }

  loadInterest(){
    this.interestService.getInterests().subscribe(
      data => {
        this.interest = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  openPanel($event){
    this.display = true;
  }

  onSubmit(value: string){
    var interest = {
      nameInterest: this.formAddInterest.get('name').value
    };
    this.interestService.addInterests(interest).pipe(
      mergeMap( message => {
        return this.interestService.getInterests().pipe(
          map(data => {
            this.interest = data;
          })
        );
      })
    ).subscribe( data => {
        this.display = false;
      }
    );
  }

  cancel(){
    this.display = false;
  }

  deleteInterest(interest) {
    this.confirmationService.confirm({
      message: '¿Estás seguro de qué deseas eliminar este interés?',
      accept: () => {
        this.interestService.deleteInterest(interest).pipe(
          mergeMap( message => {
            return this.interestService.getInterests().pipe(
              map(data => {
                this.interest = data;
              })
            );
          })
        ).subscribe( data => {}
        );
      }
    });
  }
}
