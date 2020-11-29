import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUserComponent } from './list-user.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ToolbarModule} from 'primeng/toolbar';
import {TableModule} from 'primeng/table';
import {ConfirmationService} from 'primeng/api';
import {RouterTestingModule} from '@angular/router/testing';

describe('ListUserComponent', () => {
  let component: ListUserComponent;
  let fixture: ComponentFixture<ListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUserComponent ],
      imports: [
        HttpClientTestingModule,
        ToolbarModule,
        TableModule,
        RouterTestingModule
      ],
      providers: [
        ConfirmationService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
