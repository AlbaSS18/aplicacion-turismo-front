import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {InterestService} from '../services/interest/interest.service';
import {AuthService} from '../services/auth/auth.service';
import {MenuItem, MessageService, SelectItem} from 'primeng/api';
import {validadorPasswordSame} from '../validators/validatorPasswordSame.directive';
import {validadorAgeGreaterThan} from '../validators/validatorGreaterThan.directive';
import {ActivatedRoute, Router} from '@angular/router';
import {NotificationService} from '../services/message/notification.service';
import {validadorPriorityNumberOfInterest} from '../validators/validatorPriorityNumber.directive';
import {TranslateService} from '@ngx-translate/core';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})

export class SignUpComponent implements OnInit {
  formGroup: FormGroup;
  interestArray;
  isRegisterFail = false;
  openSecondForm = false;
  isContinueFail = false;
  message;

  constructor(
    private formBuilder: FormBuilder,
    private interestService: InterestService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    const minPassLength = 7;
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateBirthday: ['', [Validators.required, validadorAgeGreaterThan()]],
      password: ['', [Validators.required, Validators.minLength(minPassLength)]],
      repeatPassword: ['', [Validators.required, Validators.minLength(minPassLength)]],
      interest: new FormArray([])
    },
      {
        validators: validadorPasswordSame()
      });
    this.loadInterest();

    // Podría sobrar si actualizo a Angular 11
    this.formGroup.valueChanges.subscribe(e => {
      this.formGroup.setValue(e, {emitEvent: false});
    });
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
            priority: new FormControl(0, [Validators.required, validadorPriorityNumberOfInterest()])
          });
          this.interest.push(control);
        });
      },
      err => {
        console.log(err);
      });
  }

  onSubmit() {
    var dateBirthday = new Date(this.formGroup.get('dateBirthday').value);
    const offset = dateBirthday.getTimezoneOffset()
    dateBirthday = new Date(dateBirthday.getTime() - (offset * 60 * 1000))
    const user = {
      userName: this.formGroup.get('name').value,
      email: this.formGroup.get('email').value,
      dateBirthday: dateBirthday.toISOString().split('T')[0],
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
        this.message = err.error.mensaje;
      });
  }

  continueSecondPartForm(){
    if (this.formGroup.get('name').valid && this.formGroup.get('email').valid && this.formGroup.get('dateBirthday').valid &&
      this.formGroup.get('password').valid && this.formGroup.get('repeatPassword').valid){
      this.openSecondForm = true;
      this.isContinueFail = false;
    }
    else{
      this.isContinueFail = true;
    }
  }

  returnFirstPartForm(){
    this.openSecondForm = false;
  }
}
