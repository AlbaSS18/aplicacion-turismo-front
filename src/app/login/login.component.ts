import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../services/auth/auth.service';
import {UserLogin} from '../models/user';
import {TokenService} from '../services/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoginFail = false;
  roles: string[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService,
    private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
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
}
