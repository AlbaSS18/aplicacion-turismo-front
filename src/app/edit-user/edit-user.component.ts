import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {Rol} from '../models/rol';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {

  editUserForm: FormGroup;
  genre: SelectItem[];
  user: User;
  userId;
  roles: Rol[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private rolesService: RolService
  ) {}

  ngOnInit(): void {
    var role = {
      id: 1,
      roleName: "ROLE_ADMIN"
    }
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editUserForm = this.fb.group({
      userName: ['', [Validators.required]],
      age: ['', Validators.required],
      genre: ['', Validators.required],
      roles: ['', Validators.required]
    });
    this.genre = [
      {label:'male', value: "Mujer"},
      {label:'female', value:"Hombre"},
    ];
    this.rolesService.getRoles().subscribe(
      data => {
        this.roles = data;
      }
    )
    this.userService.getUser(this.userId).subscribe(
      res => {
        this.user = res;
        this.editUserForm.patchValue({
          userName: this.user.userName,
          age: this.user.age,
          genre: this.user.genre,
        });
        this.editUserForm.controls['roles'].setValue(this.user.roles);
      },
      err => {
        console.log(err);
      }
    );
  }

  sendForm(){
    var user = {
      userName: this.editUserForm.get("userName").value,
      age: this.editUserForm.get("age").value,
      genre: this.editUserForm.get("genre").value,
      roles: this.editUserForm.get("roles").value
    };
    console.log(user);
    /*this.userService.editUser(this.userId, user).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );*/
  }

}
