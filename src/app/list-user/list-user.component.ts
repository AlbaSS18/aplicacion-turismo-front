import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {Rol} from '../models/rol';
import {forkJoin} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TokenService} from '../services/token/token.service';
import {map, mergeMap} from 'rxjs/operators';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users;
  cols: any[];
  roles: Rol[];
  scrollTabSelected;

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rolService: RolService,
    private translateService: TranslateService,
    private token: TokenService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'username', header: 'username' },
      { field: 'email', header: 'Email' },
      { field: 'genre', header: 'genre' },
      { field: 'age', header: 'age' },
      { field: 'role', header: 'Role'}
    ];
    forkJoin([
      this.userService.getUsers(),
      this.rolService.getRoles()
    ]).subscribe(([response1, response2]) => {
      // When Both are done loading do something
      this.users = response1;
      this.users = this.users.filter(user => user.email !== this.token.getEmail());
      this.roles = response2;
    });
  }

  confirmDelete(user){
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_user'),
      accept: () => {
        this.userService.deleteUser(user.id).pipe(
          mergeMap( message => {
            return this.userService.getUsers().pipe(
              map(data => {
                this.users = data;
                this.users = this.users.filter(restUser => restUser.email !== this.token.getEmail());
              })
            );
          })
        ).subscribe( data => {
            var message = this.translateService.instant('user_delete_message',{ 'email': user.email });
            this.messageService.add({key: 'user', severity:'success', summary: this.translateService.instant('user_delete'), detail: message });
          },
          (err) => {
            var message = this.translateService.instant('error_delete_message');
            this.messageService.add({key: 'user', severity:'error', summary: this.translateService.instant('error'), detail: message });
          }
        );
      }
    });
  }

  editUser(user){
    this.router.navigateByUrl('/user/edit/' + user.id);
  }

  changeTab(ev) {
    this.scrollTabSelected = ev.index === 1;
  }


}
