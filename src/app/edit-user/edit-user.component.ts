import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {UserService} from '../services/user/user.service';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';

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

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editUserForm = this.fb.group({
      userName: ['', [Validators.required]],
      age: ['', Validators.required],
      genre: ['', Validators.required]
    });
    this.genre = [
      {label:'male', value: "Mujer"},
      {label:'female', value:"Hombre"},
    ];
    this.userService.getUser(this.userId).subscribe(
      res => {
        this.user = res;
        this.editUserForm.patchValue({
          userName: this.user.userName,
          age: this.user.age,
          genre: this.user.genre
        });
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
      genre: this.editUserForm.get("genre").value
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

}
