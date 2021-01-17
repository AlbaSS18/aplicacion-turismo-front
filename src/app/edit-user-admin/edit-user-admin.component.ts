import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MessageService, SelectItem} from 'primeng/api';
import {User} from '../models/user';
import {Rol} from '../models/rol';
import {UserService} from '../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {RolService} from '../services/rol/rol.service';
import {TranslateService} from '@ngx-translate/core';
import {forkJoin} from 'rxjs';
import {validadorAgeGreaterThan} from '../sign-up/validatorGreaterThan.directive';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.scss']
})
export class EditUserAdminComponent implements OnInit {

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
    private rolesService: RolService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    this.editUserForm = this.fb.group({
      userName: ['', [Validators.required]],
      age: ['', [Validators.required, validadorAgeGreaterThan()]],
      genre: ['', Validators.required],
      roles: ['', Validators.required]
    });
    this.genre = [
      {label:'male', value: "Hombre"},
      {label:'female', value:"Mujer"},
    ];

    forkJoin([this.rolesService.getRoles(), this.userService.getUserForAdmin(this.userId)]).subscribe(results => {
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
        var message = this.translateService.instant('user_edit_message',{ 'nameUser': this.editUserForm.get('userName').value });
        this.messageService.add({key: 'edit-user', severity:'success', summary: this.translateService.instant('user_edit'), detail: message});
        // Para que se muestre el mensaje
        setTimeout(() => {
          this.router.navigate(['/user']);
        }, 1500);
      },
      err => {
        var message = this.translateService.instant('error_delete_message');
        this.messageService.add({key: 'edit-user', severity:'error', summary: this.translateService.instant('error'), detail: message});
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
