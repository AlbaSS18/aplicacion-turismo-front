import { Component, OnInit } from '@angular/core';
import {InterestService} from '../services/interest/interest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {map, mergeMap} from 'rxjs/operators';
import {TranslateService} from '@ngx-translate/core';
import {validadorNonwhiteSpace} from '../validators/validatorNonWhiteSpace.directive';

@Component({
  selector: 'app-list-interest',
  templateUrl: './list-interest.component.html',
  styleUrls: ['./list-interest.component.scss']
})
export class ListInterestComponent implements OnInit {

  interest;
  display: boolean = false;
  formAddInterest: FormGroup;
  errorAddInterest: boolean = false;
  displayEditDialog: boolean = false;
  formEditInterest: FormGroup;
  errorEditInterest: boolean = false;

  constructor(
    private interestService: InterestService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.formAddInterest = this.formBuilder.group({
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.formEditInterest = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', [Validators.required, validadorNonwhiteSpace()]]
    });
    this.loadInterest();
  }

  loadInterest(){
    this.interestService.getInterests().subscribe(
      data => {
        this.interest = data;
      }
    );
  }

  openPanel($event){
    this.display = true;
  }

  onSubmit(value: string){
    var interest = {
      nameInterest: this.formAddInterest.get('name').value
    };
    this.interestService.addInterests(interest).pipe(
      mergeMap( message => {
        return this.interestService.getInterests().pipe(
          map(data => {
            this.interest = data;
          })
        );
      })
    ).subscribe( data => {
        var message = this.translateService.instant('interest_add_message',{ 'nameInterest': this.formAddInterest.get('name').value });
        this.display = false;
        this.formAddInterest.reset();
        this.messageService.add({key: 'interest', severity:'success', summary: this.translateService.instant('interest_add'), detail: message });
      },
      err => {
        this.errorAddInterest = true;
      }
    );
  }

  hideDialogInterest(){
    this.formAddInterest.reset();
    this.errorAddInterest = false;
  }

  cancel(){
    this.display = false;
  }

  deleteInterest(interest) {
    this.confirmationService.confirm({
      message: this.translateService.instant('message_delete_interest'),
      accept: () => {
        this.interestService.deleteInterest(interest).pipe(
          mergeMap( message => {
            return this.interestService.getInterests().pipe(
              map(data => {
                this.interest = data;
              })
            );
          })
        ).subscribe( data => {
          var message = this.translateService.instant('interest_delete_message',{ 'nameInterest': interest.nameInterest });
          this.messageService.add({key: 'interest', severity:'success', summary: this.translateService.instant('interest_delete'), detail: message });
          },
          (err) => {
            if (err.status === 500){
              var message = this.translateService.instant('interest_has_activities');
              this.messageService.add({key: 'interest', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
            else{
              var message = this.translateService.instant('error_delete_message');
              this.messageService.add({key: 'interest', severity:'error', summary: this.translateService.instant('error'), detail: message });
            }
          }
        );
      }
    });
  }

  editInterest(interest){
    this.displayEditDialog = true;
    this.formEditInterest.patchValue({
      id: interest.id,
      name: interest.nameInterest
    });
  }

  onEditSubmit(){
    var interest = {
      nameInterest: this.formEditInterest.get('name').value
    }
    this.interestService.editInterest(this.formEditInterest.get('id').value, interest).pipe(
      mergeMap( data => {
        return this.interestService.getInterests().pipe();
      })
    ).subscribe(
      data => {
        this.displayEditDialog = false;
        var message = this.translateService.instant('interest_edit_message',{ 'nameInterest': interest.nameInterest });
        this.messageService.add({key: 'interest', severity:'success', summary: this.translateService.instant('interest_edit'), detail: message });
        this.interest = data;
      },
      err => {
        this.errorEditInterest = true;
      }
    );
  }

  cancelEdit(){
    this.displayEditDialog = false;
  }

  hideDialogEditInterest(){
    this.errorEditInterest = false;
  }


}
