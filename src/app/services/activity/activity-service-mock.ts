import {ActivityService} from './activity.service';
import {Injectable} from '@angular/core';
import {Activity} from '../../models/activity';
import {Observable, of} from 'rxjs';


@Injectable()
export class MockActivityService extends ActivityService {

  listActivities = [
    {
      id: 1,
      name: 'Universidad Laboral',
      description: 'Universidad situada en Gijón',
      latitude: 43.524088,
      longitude: -5.614049,
      pathImage: 'universidad.jpg',
      city: 'Gijón',
      interest: 'Iglesia',
      address: 'Universidad Laboral, Calle José Luis Álvarez Margaride, Cabueñes, La Guía, Distrito Rural, Gijón, 33394, España',
      metadataImage: {
        filename: 'universidad.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      }
    },
    {
      id: 2,
      name: 'Elogio del horizonte',
      description: 'Elogio del horizonte es el nombre de una escultura de hormigón situada en la ciudad de Gijón, realizada por el escultor vasco Eduardo Chillida.​ Se trata de una obra de grandes proporciones erigida en el año 1990 en el Cerro de Santa Catalina.​',
      latitude: 43.549,
      longitude: -5.6631,
      pathImage: 'elogio.jpg',
      city: 'Gijón',
      interest: 'Escultura',
      address: 'Elogio del Horizonte, Parque del Cerro, Cimadevilla, Distrito Centro, Gijón, 33201, España',
      metadataImage: {
        filename: 'elogio.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      }
    }
  ];

  getActivities(): Observable<Activity[]> {
    return of(this.listActivities);
  }

  deleteActivity(id): Observable<any> {
    console.log(id)
    return of();
  }


}
