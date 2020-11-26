import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ConfirmationService} from 'primeng/api';

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
    private confirmationService: ConfirmationService
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
    this.userService.getUser().subscribe(
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
        //this.userService.deleteUser(id);
      },
      reject: () => {

      }
    });
  }


}
