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
import {validadorAgeGreaterThan} from '../validators/validatorGreaterThan.directive';

@Component({
  selector: 'app-edit-user-admin',
  templateUrl: './edit-user-admin.component.html',
  styleUrls: ['./edit-user-admin.component.scss']
})
export class EditUserAdminComponent implements OnInit {

  editUserForm: FormGroup;
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
      dateBirthday: ['', [Validators.required, validadorAgeGreaterThan()]],
      roles: ['', Validators.required]
    });

    forkJoin([this.rolesService.getRoles(), this.userService.getUserForAdmin(this.userId)]).subscribe(results => {
      this.roles = results[0];
      this.user = results[1];
      this.editUserForm.patchValue({
        userName: this.user.userName,
        dateBirthday: new Date(this.user.dateBirthday)
      });
      this.editUserForm.controls['roles'].setValue(this.user.roles);
      this.observeChanges();
    });
  }

  sendForm(){
    var dateBirthday = new Date(this.editUserForm.get('dateBirthday').value);
    const offset = dateBirthday.getTimezoneOffset()
    dateBirthday = new Date(dateBirthday.getTime() - (offset * 60 * 1000))

    var user = {
      userName: this.editUserForm.get("userName").value,
      dateBirthday: dateBirthday.toISOString().split('T')[0],
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
      else if (propName === "dateBirthday"){
        var d1 = new Date(new Date(a[propName]).toDateString());
        var d2 = new Date(b[propName].toDateString());
        if (d1.getTime() !== d2.getTime()){
          this.valueUnchanged = false;
          return false;
        }
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
