import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';

@Component({
  selector: 'app-modify-preferences',
  templateUrl: './modify-preferences.component.html',
  styleUrls: ['./modify-preferences.component.scss']
})
export class ModifyPreferencesComponent implements OnInit {

  modifyPreferencesForm: FormGroup;

  constructor(private fb: FormBuilder, private interestService: InterestService) { }
n
  ngOnInit(): void {
    // Service que me devuelva los intereses del usuario
    this.interestService.getInterestByUser(5).subscribe(
      data => {
        console.log(data);
      }
    );
    this.modifyPreferencesForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required]
    });
  }

}
