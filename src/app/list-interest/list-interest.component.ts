import { Component, OnInit } from '@angular/core';
import {InterestService} from '../services/interest/interest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
    private formBuilder: FormBuilder
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
      name: this.formAddInterest.get('name').value
    };
    /*this.interestService.addInterests(interest).subscribe(
      data => {
        this.display = false;
        this.loadInterest();
      }
    )*/
  }
}
