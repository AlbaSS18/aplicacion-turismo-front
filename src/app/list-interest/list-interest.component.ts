import { Component, OnInit } from '@angular/core';
import {InterestService} from '../services/interest/interest.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ConfirmationService, MessageService} from 'primeng/api';
import {map, mergeMap, switchMap} from 'rxjs/operators';

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

  constructor(
    private interestService: InterestService,
    private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.formAddInterest = this.formBuilder.group({
      name: ['', Validators.required]
    });
    this.loadInterest();
  }

  loadInterest(){
    this.interestService.getInterests().subscribe(
      data => {
        this.interest = data;
      },
      err => {
        console.log(err);
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
        var message = 'El interés ' + this.formAddInterest.get('name').value + ' ha sido añadido con éxito';
        this.display = false;
        this.formAddInterest.reset();
        this.messageService.add({key: 'interest', severity:'success', summary:'Interés añadido', detail: message });
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
      message: '¿Estás seguro de qué deseas eliminar este interés?',
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
          var message = 'El interés ' + interest.nameInterest + ' ha sido eliminado con éxito';
          this.messageService.add({key: 'interest', severity:'success', summary:'Interés eliminado', detail: message });
          },
          (err) => {
          var message = 'Ha ocurrido un error inesperado. Inténtelo de nuevo más tarde';
          this.messageService.add({key: 'interest', severity:'error', summary:'Error', detail: message });
          }
        );
      }
    });
  }
}
