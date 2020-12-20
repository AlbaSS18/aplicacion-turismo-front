import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {Rol} from '../models/rol';
import {forkJoin} from 'rxjs';

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
  valueUnchanged: boolean = true;

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

    forkJoin([this.rolesService.getRoles(), this.userService.getUser(this.userId)]).subscribe(results => {
      this.roles = results[0];
      this.user = results[1];
      this.editUserForm.patchValue({
        userName: this.user.userName,
        age: this.user.age,
        genre: this.user.genre,
      });
      this.editUserForm.controls['roles'].setValue(this.user.roles);
      this.observeChanges();
    });
  }

  sendForm(){
    var user = {
      userName: this.editUserForm.get("userName").value,
      age: this.editUserForm.get("age").value,
      genre: this.editUserForm.get("genre").value,
      roles: this.editUserForm.get("roles").value
    };
    this.userService.editUser(this.userId, user).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log(err);
      }
    );
  }

  observeChanges() {
    this.editUserForm.valueChanges.subscribe((values) => {
      this.isEquivalent(this.user, values);
    });
  }

  isEquivalent(a, b) {
    this.valueUnchanged = true;
    var aProps = Object.keys(a);
    var bProps = Object.keys(b);
    for (var i = 0; i < bProps.length; i++) {
      let propName = bProps[i];
      if (propName == "roles"){
        this.valueUnchanged = a[propName].length === b[propName].length && a[propName].every((value, index) => value === b[propName][index]);
        return a[propName].length === b[propName].length && a[propName].every((value, index) => value === b[propName][index]);
      }
      else{
          if (a[propName] !== b[propName]) {
            this.valueUnchanged = false;
            return false;
          }
        }
      }
  }



}
