import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {UserService} from '../services/user/user.service';

@Component({
  selector: 'app-modify-preferences',
  templateUrl: './modify-preferences.component.html',
  styleUrls: ['./modify-preferences.component.scss']
})
export class ModifyPreferencesComponent implements OnInit {

  modifyPreferencesForm: FormGroup;
  interestByUser;
  interestList;

  constructor(private fb: FormBuilder, private interestService: InterestService, private userService: UserService) { }

  ngOnInit(): void {
    // this.modifyPreferencesForm = this.fb.group({
    //   interest: this.fb.array([])
    // });
    // this.userService.getUsers().pipe(
    //   map (data => data.filter(p => p.email === this.tokenService.getEmail())),
    //   mergeMap ( user => {
    //     return forkJoin([this.interestService.getInterestByUser(user[0].id), this.interestService.getInterests()]).pipe();
    //   })
    // ).subscribe(
    //   ([response1, response2]) => {
    //     this.interestByUser = response1;
    //     this.interestList = response2;
    //     this.interestList.forEach(
    //       interest => {
    //         var priorityInterest = this.interestByUser.filter(interestByUser => interestByUser.interestID === interest.id).map(prio => prio.priority);
    //         var newItem;
    //         if (priorityInterest.length === 0){
    //           newItem = this.fb.group({
    //             nameInterest: [interest.nameInterest, Validators.required],
    //             priority: [0, Validators.required]
    //           });
    //         }
    //         else{
    //           newItem = this.fb.group({
    //             nameInterest: [interest.nameInterest, Validators.required],
    //             priority: [priorityInterest[0], Validators.required]
    //           });
    //         }
    //         this.interest.push(newItem);
    //       }
    //     );
    //   }
    // );

  }

  // get interests(): FormArray {
  //   return this.modifyPreferencesForm.get('interests') as FormArray;
  // }
  //
  // editPreferences(){
  //   console.log(this.modifyPreferencesForm);
  // }
}
