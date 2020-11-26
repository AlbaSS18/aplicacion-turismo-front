import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {AuthService} from '../services/auth/auth.service';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  genre: SelectItem[];
  genreSelected: string;
  interestArray;
  isRegisterFail = false;

  constructor(
    private formBuilder: FormBuilder,
    private interestService: InterestService,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    const minPassLength = 7;
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(minPassLength)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(minPassLength)]],
      genre: '',
      interest: new FormArray([])
    });
    this.loadInterest();
    this.genre = [
      {label: 'Select City', value: null},
      {label: 'Hombre', value: 'Hombre'},
      {label: 'Mujer', value: 'Mujer'}
    ];
  }

  get interest(): FormArray {
    return this.formGroup.get('interest') as FormArray;
  }

  loadInterest() {
    this.interestService.getInterests().subscribe(data => {
        this.interestArray = data;
        this.interestArray.forEach(interest => {
          const control = new FormGroup({
            priority: new FormControl(0, [Validators.required])
          });
          this.interest.push(control);
        });
      },
      err => {
        console.log(err);
      });
  }

  onSubmit(value: string) {
    const user = {
      nameUser: this.formGroup.get('name').value,
      email: this.formGroup.get('email').value,
      age: this.formGroup.get('age').value,
      genre: this.formGroup.get('genre').value,
      password: this.formGroup.get('password').value,
      passwordRepeated: this.formGroup.get('repeatPassword').value,
      roles: ['user'],
      interest: this.interest.value,
    };
    console.log(user);
    this.authService.signUp(user).subscribe(
      data => {
        this.isRegisterFail = false;
      },
      (err) => {
        this.isRegisterFail = true;
      });
  }
}
