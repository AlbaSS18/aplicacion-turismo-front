import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../services/token/token.service';
import {InterestService} from '../services/interest/interest.service';
import {SelectItem} from 'primeng/api';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserProfile: FormGroup;
  interestList;
  user;
  genre;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private interestService: InterestService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.genre = [
      {label:'Masculino', value: "Masculino", id: "male"},
      {label:'Femenino', value:"Femenino", id: "female"},
    ];
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      var aux = [];
      for (let item of this.genre){
        item.label = this.translateService.instant(item.id);
        aux.push(item);
      }
      this.genre = aux;
    })
    this.editUserProfile = this.fb.group({
      age: ['', Validators.required],
      genre: ['', Validators.required],
      interests: this.fb.array([]),
      userName: ['', Validators.required]
    });
    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.tokenService.getEmail())),
      mergeMap ( user => {
        return forkJoin([this.userService.getUser(user[0].id), this.interestService.getInterests()]).pipe();
      })
    ).subscribe(
      ([response1, response2]) => {
        console.log(response1);
        console.log(response2);
        this.user = response1;
        this.interestList = response2;
        this.editUserProfile.patchValue({
          userName: this.user.userName,
          age: this.user.age,
          genre: this.user.genre,
        });
        this.interestList.forEach(
          interest => {
            var priorityInterest = this.user.interest.filter(interestByUser => interestByUser.interestID === interest.id).map(prio => prio.priority);
            var newItem;
            if (priorityInterest.length === 0){
              newItem = this.fb.group({
                nameInterest: [interest.nameInterest, Validators.required],
                priority: [0, Validators.required]
              });
            }
            else{
              newItem = this.fb.group({
                nameInterest: [interest.nameInterest, Validators.required],
                priority: [priorityInterest[0], Validators.required]
              });
            }
            this.interests.push(newItem);
          }
        );
      }
    );
  }

  get interests(): FormArray {
    return this.editUserProfile.get('interests') as FormArray;
  }

  updateUserProfile(){
    console.log(this.editUserProfile);
  }


}
