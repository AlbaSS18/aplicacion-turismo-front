import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../services/token/token.service';
import {InterestService} from '../services/interest/interest.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {validadorAgeGreaterThan} from '../sign-up/validatorGreaterThan.directive';
import {SelectItem} from 'primeng/api';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserProfile: FormGroup;
  interestList;
  user;
  genre: SelectItem[];
  valueUnchanged: boolean = true;

  constructor(
    private userService: UserService,
    private tokenService: TokenService,
    private interestService: InterestService,
    private fb: FormBuilder,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    var auxGenre = [
      {label:'Masculino', value:'Hombre', id: "male"},
      {label:'Femenino', value:'Mujer', id: "female"},
    ];
    this.genre = [
      {label: this.translateService.instant('male'), value: 'Hombre'},
      {label: this.translateService.instant('female'), value: 'Mujer'}
    ];
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        this.genre = [];
        var aux = [];
        for (let item of auxGenre){
          item.label = this.translateService.instant(item.id);
          var itemAux = {label: item.label, value: item.value}
          aux.push(itemAux);
        }
        this.genre = aux;
      })
    this.editUserProfile = this.fb.group({
      age: ['', [Validators.required, validadorAgeGreaterThan()]],
      genre: ['', Validators.required],
      interest: this.fb.array([]),
      userName: ['', Validators.required]
    });
    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.tokenService.getEmail())),
      mergeMap ( user => {
        return forkJoin([this.userService.getUser(user[0].id), this.interestService.getInterests()]).pipe();
      })
    ).subscribe(
      ([response1, response2]) => {
        this.user = response1;
        console.log(response1)
        this.interestList = response2;
        this.editUserProfile.patchValue({
          userName: this.user.userName,
          age: this.user.age,
          genre: this.user.genre,
        });
        this.user.interest.forEach(
          infoInterest => {
            console.log(infoInterest)
            var newItem = this.fb.group({
              interestID: [infoInterest.interestID, Validators.required],
              nameInterest: [infoInterest.nameInterest, Validators.required],
              priority: [infoInterest.priority, Validators.required]
            });
            this.interest.push(newItem);
          }
        )
        console.log(this.interest.controls)
        /*this.interestList.forEach(
          interest => {
            var priorityInterest = this.user.interest.filter(interestByUser => interestByUser.interestID === interest.id).map(prio => prio.priority);
            var newItem;
            if (priorityInterest.length === 0){
              newItem = this.fb.group({
                interestID: [interest.id, Validators.required],
                nameInterest: [interest.nameInterest, Validators.required],
                priority: [0, Validators.required]
              });
            }
            else{
              newItem = this.fb.group({
                interestID: [interest.id, Validators.required],
                nameInterest: [interest.nameInterest, Validators.required],
                priority: [priorityInterest[0], Validators.required]
              });
            }
            this.interest.push(newItem);
          }
        );*/
        this.observeChanges();
      }
    );
  }

  get interest(): FormArray {
    return this.editUserProfile.get('interest') as FormArray;
  }

  updateUserProfile(){
    var user = {
      age: this.editUserProfile.get("age").value,
      userName: this.editUserProfile.get("userName").value,
      genre: this.editUserProfile.get("genre").value,
      interest: this.interest.value,
      roles: this.user.roles
    };
    console.log(user);
    // this.userService.editUser(this.user.id, user).subscribe(
    //   data => {
    //     console.log(data);
    //   }
    // );

  }

  observeChanges() {
    this.editUserProfile.valueChanges.subscribe((values) => {
      this.isEquivalent(this.user, values);
    });
  }

  isEquivalent(a, b) {
    this.valueUnchanged = true;
    var aProps = Object.keys(a);
    var bProps = Object.keys(b);
    for (var i = 0; i < bProps.length; i++) {
      let propName = bProps[i];
      if (propName === "interest"){
        // Sort array
        var array1Sort = a[propName].sort((a, b) => (a.interestID < b.interestID ? -1 : 1));
        var array2Sort = b[propName].sort((a, b) => (a.interestID < b.interestID ? -1 : 1));
        var check = array1Sort.length === array2Sort.length && array1Sort.every((value, index) => JSON.stringify(value) === JSON.stringify(array2Sort[index]));
        if (check === false){
          this.valueUnchanged = check;
          return array1Sort.length === array2Sort.length && array1Sort.every((value, index) => JSON.stringify(value) === JSON.stringify(array2Sort[index]));
        }
      }
      else{
        if (a[propName] !== b[propName]) {
          this.valueUnchanged = false;
          return false;
        }
      }
    }
  }


}
