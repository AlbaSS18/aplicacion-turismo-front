import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import {Router} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {TranslateService} from '@ngx-translate/core';
import {map, mergeMap} from 'rxjs/operators';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users;
  cols: any[];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rolService: RolService,
    private translateService: TranslateService,
    private localStorageService: LocalStorageService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'userName', header: 'username' },
      { field: 'email', header: 'Email' },
      { field: 'dateBirthday', header: 'date_birth' },
      { field: 'roles', header: 'Role'}
    ];
    this.userService.getUsers().subscribe(response => {
      this.users = response;
      this.users = this.users.filter(user => user.email !== this.localStorageService.getEmailUser());
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
                this.users = this.users.filter(restUser => restUser.email !== this.localStorageService.getEmailUser());
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
    this.router.navigateByUrl('admin/user/edit/' + user.id);
  }


}
