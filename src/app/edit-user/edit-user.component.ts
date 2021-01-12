import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../services/token/token.service';
import {InterestService} from '../services/interest/interest.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {validadorAgeGreaterThan} from '../sign-up/validatorGreaterThan.directive';

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
  valueUnchanged: boolean = true;

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
            this.observeChanges();
          }
        );
      }
    );
  }

  get interest(): FormArray {
    return this.editUserProfile.get('interest') as FormArray;
  }

  updateUserProfile(){
    console.log(this.editUserProfile);
    var user = {
      age: this.editUserProfile.get("age").value,
      userName: this.editUserProfile.get("userName").value,
      genre: this.editUserProfile.get("genre").value,
      interest: this.interest.value,
      roles: this.user.roles
    };
    console.log(user);
    this.userService.editUser(this.user.id, user).subscribe(
      data => {
        console.log(data);
      }
    );

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
      console.log(propName)
      console.log(a[propName]);
      console.log(b[propName])
      if (a[propName] !== b[propName]) {
        console.log("a")
        this.valueUnchanged = false;
        return false;
      }
    }
  }


}
