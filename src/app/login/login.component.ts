import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {UserLogin} from '../models/user';
import {TokenService} from '../services/token/token.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Message, MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {NotificationService} from '../services/message/notification.service';

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
    private tokenService: TokenService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
    private translateService: TranslateService,
    private notification: NotificationService) {}

  ngOnInit(): void {
    this.infoMessage = this.getMessages();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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
        this.tokenService.setToken(data.token);
        this.tokenService.setEmail(data.email);
        this.tokenService.setAuthorities(data.authorities);
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
        this.router.navigateByUrl('/recommendation');
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
