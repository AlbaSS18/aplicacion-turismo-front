import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { EditActivitiesComponent } from './edit-activities.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TranslateModule} from '@ngx-translate/core';
import {ActivatedRoute, convertToParamMap, Router, RouterModule} from '@angular/router';
import {FileUploadModule} from 'primeng/fileupload';
import {InputNumberModule} from 'primeng/inputnumber';
import {DropdownModule} from 'primeng/dropdown';
import {MenuBarComponent} from '../menu-bar/menu-bar.component';
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ActivityService} from '../services/activity/activity.service';
import {MockActivityService} from '../services/activity/activity-service-mock';
import {InterestService} from '../services/interest/interest.service';
import {MockInterestService} from '../services/interest/interest-service-mock';

describe('EditActivitiesComponent', () => {
  let component: EditActivitiesComponent;
  let fixture: ComponentFixture<EditActivitiesComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditActivitiesComponent, MenuBarComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        FormsModule,
        TranslateModule.forRoot(),
        RouterModule.forRoot([], { relativeLinkResolution: 'legacy' }),
        FileUploadModule,
        InputNumberModule,
        DropdownModule,
        ToastModule
      ],
      providers: [
        MessageService,
        {provide: ActivityService, useClass: MockActivityService},
        {provide: InterestService, useClass: MockInterestService},
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: 2
              })
            }
          }
        }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load the interests', () => {
    const interest = [
      {
        label: 'Museos',
        value: 'Museos'
      },
      {
        label: 'Iglesias',
        value: 'Iglesias'
      }
    ];
    expect(component.interest).toEqual(interest);
  });

  it('should load the activities', () => {
    const activity = {
      id: 2,
      name: 'Elogio del horizonte',
      description: 'Elogio del horizonte es el nombre de una escultura de hormigón situada en la ciudad de Gijón, realizada por el escultor vasco Eduardo Chillida.​ Se trata de una obra de grandes proporciones erigida en el año 1990 en el Cerro de Santa Catalina.​',
      latitude: 43.549,
      longitude: -5.6631,
      pathImage: 'elogio.jpg',
      locality: 'Gijón',
      interest: 'Escultura',
      address: 'Elogio del Horizonte, Parque del Cerro, Cimadevilla, Distrito Centro, Gijón, 33201, España',
      metadataImage: {
        filename: 'elogio.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      }
    }
    expect(component.activity).toEqual(activity);
  });

  it('should compare json that are different', () => {
    const act1 = {
      id: 102,
      name: "Campo de San Francisco",
      description: "El Campo de San Francisco es un parque urbano situado en el centro de la ciudad Oviedo (España).",
      address: "Parque de San Francisco, Llamaquique, Centro y casco histórico, Oviedo, España",
      locality: "Oviedo",
      interest: "Parques",
      latitude: 43.361178800000005,
      longitude: -5.850675357790575,
      metadataImage: {
        data: "E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=",
        fileName: "PARQUE_SAN_FRANCISCO",
        mimetype: "image/jpg"
      },
      pathImage: "PARQUE_SAN_FRANCISCO.jpg"
    };

    const act2 = {
      name: "San Francisco",
      description: "El Campo de San Francisco es un parque urbano situado en el centro de la ciudad Oviedo (España). Es uno de los lugares más emblemáticos de la ciudad",
      address: "Universidad Laboral, Calle José Luis Álvarez Margaride, Cabueñes, La Guía, Distrito Rural, Gijón, 33394, España",
      locality: "Gijón",
      interest: "Iglesia",
      latitude: 43.524088,
      longitude: -5.614049
    };

    component.isEquivalent(act1, act2);
    expect(component.valueUnchanged).toBeFalse();
  });

  it('should compare json that are same', () => {
    const act1 = {
      id: 102,
      name: "Campo de San Francisco",
      description: "El Campo de San Francisco es un parque urbano situado en el centro de la ciudad Oviedo (España).",
      address: "Parque de San Francisco, Llamaquique, Centro y casco histórico, Oviedo, España",
      locality: "Oviedo",
      interest: "Parques",
      latitude: 43.361178800000005,
      longitude: -5.850675357790575,
      metadataImage: {
        data: "E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=",
        fileName: "PARQUE_SAN_FRANCISCO",
        mimetype: "image/jpg"
      },
      pathImage: "PARQUE_SAN_FRANCISCO.jpg"
    };

    const act2 = {
      name: "Campo de San Francisco",
      description: "El Campo de San Francisco es un parque urbano situado en el centro de la ciudad Oviedo (España).",
      address: "Parque de San Francisco, Llamaquique, Centro y casco histórico, Oviedo, España",
      locality: "Oviedo",
      interest: "Parques",
      latitude: 43.361178800000005,
      longitude: -5.850675357790575
    };

    component.isEquivalent(act1, act2);
    expect(component.valueUnchanged).toBeTrue();
  });

  it('should edit the activity', fakeAsync(() => {
    const navigateSpy = spyOn(router, 'navigate');
    component.editActivitiesForm.controls['name'].setValue('Campo de San Francisco');
    component.editActivitiesForm.controls['description'].setValue('El Campo de San Francisco es un parque urbano situado en el centro de la ciudad Oviedo (España).');
    component.editActivitiesForm.controls['latitude'].setValue(43.361178800000005);
    component.editActivitiesForm.controls['longitude'].setValue(-5.850675357790575);
    component.editActivitiesForm.controls['locality'].setValue('Oviedo');
    component.editActivitiesForm.controls['interest'].setValue('Parques');
    component.editActivitiesForm.controls['address'].setValue('Parque de San Francisco, Llamaquique, Centro y casco histórico, Oviedo, España');

    component.editActivity();

    tick(2500);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/activities']);
  }));
});
