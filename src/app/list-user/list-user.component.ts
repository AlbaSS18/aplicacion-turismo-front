import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user/user.service';
import {ConfirmationService} from 'primeng/api';
import {Router} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {Rol} from '../models/rol';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {

  users;
  cols: any[];
  roles: Rol[];

  constructor(
    private userService: UserService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private rolService: RolService
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
    //this.loadUsers();
    //this.loadRol();
    forkJoin([
      this.userService.getUsers(), //observable 1
      this.rolService.getRoles() //observable 2
    ]).subscribe(([response1, response2]) => {
      // When Both are done loading do something
      this.users = response1;
      this.roles = response2;
      console.log(this.roles);
    });
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

  loadRol(){
    this.rolService.getRoles().subscribe(
      data => {
        this.roles = data;
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
