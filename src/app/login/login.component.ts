import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message, MessageService} from 'primeng/api';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../services/message/notification.service';
import {LocalStorageService} from '../services/local-storage/local-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFail = false;
  roles: string[] = [];
  infoMessage = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translateService: TranslateService,
    private notification: NotificationService,
    private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    this.processMessageTranslation(this.getMessages());
    this.infoMessage = this.getMessages();
    this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.processMessageTranslation(this.getMessages());
    });
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  processMessageTranslation(messages): void {
    this.infoMessage = [];
    for (let message of messages){
      var mAux = message;
      mAux.summary = this.translateService.instant("sign_up_successful_message_summary");
      mAux.detail = this.translateService.instant("sign_up_successful_message_detail");
      this.infoMessage.push(mAux);
    }
  }

  getMessages(): Message[] {
    return this.notification.message;
  }

  onSubmit() {
    const usuario = {
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(usuario).subscribe(data => {
        this.localStorageService.setToken(data.token);
        this.isLoginFail = false;
        this.roles = this.localStorageService.getRolesUser();
        if (this.roles.includes("ROLE_ADMIN")){
          this.router.navigate(['/user']);
        }
        else{
          this.router.navigate(['/recommendationMap']);
        }
      },
      (err: any) => {
        this.isLoginFail = true;
      });
  }

  ngOnDestroy() {
    this.notification.message = [];
  }

  closeMessage(event) {
    console.log(event);
    this.notification.message = [];
    this.infoMessage = this.getMessages();
  }
}
