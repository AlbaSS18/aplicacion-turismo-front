import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cols = [
      { field: 'id', header: 'Id' },
      { field: 'username', header: 'Username' },
      { field: 'email', header: 'Email' },
      { field: 'password', header: 'Password' },
      { field: 'genre', header: 'Genre' },
      { field: 'age', header: 'Age' },
      { field: 'role', header: 'Role'}
    ];
    this.loadUsers();
  }

  loadUsers(){
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  confirmDelete(user){
    console.log(user);
    this.confirmationService.confirm({
      message: '¿Estás seguro que quieres eliminar esta ciudad? Se eliminarán todos los datos relacionados',
      accept: () => {
        this.userService.deleteUser(user.id).subscribe(
          data => {
            this.loadUsers();
            console.log(data);
          },
          err => {
            console.log(err);
          }
        );
      },
      reject: () => {

      }
    });
  }

  editUser(user){
    this.userService.sendUser(user);
    this.router.navigateByUrl('/user/edit/' + user.id);
  }


}
