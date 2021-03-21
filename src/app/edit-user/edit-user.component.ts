import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {map, mergeMap} from 'rxjs/operators';
import {forkJoin} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../services/token/token.service';
import {InterestService} from '../services/interest/interest.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {validadorAgeGreaterThan} from '../validators/validatorGreaterThan.directive';
import {MessageService, SelectItem} from 'primeng/api';
import {validadorPriorityNumberOfInterest} from '../validators/validatorPriorityNumber.directive';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  editUserProfile: FormGroup;
  user;
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
    this.editUserProfile = this.fb.group({
      dateBirthday: ['', [Validators.required, validadorAgeGreaterThan()]],
      interest: this.fb.array([]),
      userName: ['', Validators.required]
    });
    this.userService.getUsers().pipe(
      map (data => data.filter(p => p.email === this.tokenService.getEmailUser())),
      mergeMap ( user => {
        return forkJoin([this.userService.getUser(user[0].id)]).pipe();
      })
    ).subscribe(
      ([response1]) => {
        this.user = response1;
        this.editUserProfile.patchValue({
          userName: this.user.userName,
          dateBirthday: new Date(this.user.dateBirthday)
        });
        this.user.interest.forEach(
          infoInterest => {
            var newItem = this.fb.group({
              interestID: [infoInterest.interestID, Validators.required],
              nameInterest: [infoInterest.nameInterest, Validators.required],
              priority: [infoInterest.priority, [Validators.required, validadorPriorityNumberOfInterest()]]
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
    var dateBirthday = new Date(this.editUserProfile.get('dateBirthday').value);
    const offset = dateBirthday.getTimezoneOffset()
    dateBirthday = new Date(dateBirthday.getTime() - (offset * 60 * 1000))
    var user = {
      dateBirthday: dateBirthday.toISOString().split('T')[0],
      userName: this.editUserProfile.get("userName").value,
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
      else if (propName === "dateBirthday"){
        var d1 = new Date(new Date(a[propName]).toDateString());
        var d2 = new Date(b[propName]?.toDateString());
        if (d1.getTime() !== d2.getTime()){
          this.valueUnchanged = false;
          return false;
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
