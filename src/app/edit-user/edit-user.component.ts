import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../services/token/token.service';
import {InterestService} from '../services/interest/interest.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {validadorAgeGreaterThan} from '../sign-up/validatorGreaterThan.directive';
import {MessageService, SelectItem} from 'primeng/api';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserProfile: FormGroup;
  user;
  genre: SelectItem[];
  valueUnchanged: boolean = true;
  infoMessage = [];

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
          var itemAux = {label: item.label, value: item.value};
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
        return forkJoin([this.userService.getUser(user[0].id)]).pipe();
      })
    ).subscribe(
      ([response1]) => {
        this.user = response1;
        this.editUserProfile.patchValue({
          userName: this.user.userName,
          age: this.user.age,
          genre: this.user.genre,
        });
        this.user.interest.forEach(
          infoInterest => {
            var newItem = this.fb.group({
              interestID: [infoInterest.interestID, Validators.required],
              nameInterest: [infoInterest.nameInterest, Validators.required],
              priority: [infoInterest.priority, Validators.required]
            });
            this.interest.push(newItem);
          }
        )
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
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      var aux = this.infoMessage;
      this.infoMessage = [];
      for (let message of aux){
        var mAux = message;
        mAux.summary = this.translateService.instant("user_profile_edit");
        mAux.detail = this.translateService.instant("user_profile_edit_message");
        this.infoMessage.push(mAux);
      }
    });
    this.userService.editUser(this.user.id, user).pipe(
      map( data => {
        this.valueUnchanged = true;
        var message = this.translateService.instant('user_profile_edit_message');
        this.infoMessage = [
          {key: 'edit_profile_user', severity:'success', summary: this.translateService.instant('user_profile_edit'), detail: message}
          ];
      }),
      mergeMap( () => {
        return this.userService.getUser(this.user.id).pipe();
      })
    ).subscribe(
      data => {
        this.user = data;
      },
      (err) => {
        var message = this.translateService.instant('error_delete_message');
        this.infoMessage = [
          { key: 'edit_profile_user', severity:'error', summary: this.translateService.instant('error'), detail: message}
        ];
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
