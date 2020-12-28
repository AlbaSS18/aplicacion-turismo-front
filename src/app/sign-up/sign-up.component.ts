import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {AuthService} from '../services/auth/auth.service';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {validadorPasswordSame} from './validatorPasswordSame.directive';
import {validadorAgeGreaterThan} from './validatorGreaterThan.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../services/message/notification.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  genre: SelectItem[];
  interestArray;
  isRegisterFail = false;
  openSecondForm = false;
  isContinueFail = false;

  constructor(
    private formBuilder: FormBuilder,
    private interestService: InterestService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    const minPassLength = 7;
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, validadorAgeGreaterThan()]],
      password: ['', [Validators.required, Validators.minLength(minPassLength)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(minPassLength)]],
      genre: ['', Validators.required],
      interest: new FormArray([])
    },
      {
        validator: validadorPasswordSame()
      });
    this.loadInterest();
    this.genre = [
      {label: 'select_genre', value: ''},
      {label: 'male', value: 'Hombre'},
      {label: 'female', value: 'Mujer'}
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
            nameInterest: new FormControl(interest.nameInterest, Validators.required),
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
      userName: this.formGroup.get('name').value,
      email: this.formGroup.get('email').value,
      age: this.formGroup.get('age').value,
      genre: this.formGroup.get('genre').value,
      password: this.formGroup.get('password').value,
      passwordConfirm: this.formGroup.get('repeatPassword').value,
      roles: ['user'],
      interest: this.interest.value
    };
    this.authService.signUp(user).subscribe(
      data => {
        this.isRegisterFail = false;
        this.notificationService.success("sign_up_successful_message_detail", "sign_up_successful_message_summary");
        this.router.navigate(['login']);
      },
      (err) => {
        this.isRegisterFail = true;
      });
  }

  continueSecondPartForm(){
    console.log(this.formGroup)
    if (this.formGroup.get('name').valid && this.formGroup.get('email').valid && this.formGroup.get('age').valid &&
      this.formGroup.get('password').valid && this.formGroup.get('repeatPassword').valid && this.formGroup.get('genre').valid){
      this.openSecondForm = true;
      this.isContinueFail = false;
    }
    else{
      this.isContinueFail = true;
    }
    console.log(this.formGroup);
  }

  returnFirstPartForm(){
    this.openSecondForm = false;
  }
}
