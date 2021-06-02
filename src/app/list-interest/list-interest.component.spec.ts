import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListInterestComponent } from './list-interest.component';
import {DialogModule} from 'primeng/dialog';
import {VirtualScrollerModule} from 'primeng/virtualscroller';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {RouterTestingModule} from '@angular/router/testing';
import {Confirmation, ConfirmationService, MessageService} from 'primeng/api';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {TranslateModule} from '@ngx-translate/core';
import {AuthService} from '../services/auth/auth.service';
import {MockAuthService} from '../services/auth/auth-service-mock';
import {InterestService} from '../services/interest/interest.service';
import {MockInterestService} from '../services/interest/interest-service-mock';

describe('ListInterestComponent', () => {
  let component: ListInterestComponent;
  let fixture: ComponentFixture<ListInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        DialogModule,
        VirtualScrollerModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        ButtonModule,
        CardModule,
        RouterTestingModule,
        ConfirmDialogModule,
        ToastModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ ListInterestComponent, MenuBarComponent ],
      providers: [
        ConfirmationService,
        MessageService,
        {provide: InterestService, useClass: MockInterestService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the interest', () => {
    expect(component.interest.length).toBe(2);
  });

  it('should delete the interest', () => {
    let confirmService = fixture.debugElement.injector.get(ConfirmationService);
    spyOn(confirmService, 'confirm').and.callFake((confirmation: Confirmation) => { return confirmation.accept(); });
    var interest = {
      id: 2,
      nameInterest: 'Iglesias'
    };
    component.deleteInterest(interest);
    expect(component.interest.length).toBe(1);
  });

  it('should edit the interest', () => {
    component.formEditInterest.controls['id'].setValue(2);
    component.formEditInterest.controls['name'].setValue('Igles');
    component.onEditSubmit();
    expect(component.displayEditDialog).toBeFalse();

    const updateItem = component.interest.find(inter => inter.id === 2);
    expect(updateItem.nameInterest).toBe('Igles');
  });

  it('should add a interest', () => {
    component.formEditInterest.controls['name'].setValue('Playas');
    component.onSubmit();

    expect(component.display).toBeFalse();
    expect(component.interest.length).toBe(3);
  });
});
