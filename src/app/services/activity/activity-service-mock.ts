import {ActivityService} from './activity.service';
import {Injectable} from '@angular/core';
import {Activity, ActivityRecommended} from '../../models/activity';
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
      locality: 'Gijón',
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
      locality: 'Gijón',
      interest: 'Escultura',
      address: 'Elogio del Horizonte, Parque del Cerro, Cimadevilla, Distrito Centro, Gijón, 33201, España',
      metadataImage: {
        filename: 'elogio.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      }
    }
  ];


  listActivitiesRated = [
    {
      id: 8,
      name: 'Estatua de Don Pelayo',
      description: 'Escultura de Gijón',
      latitude: 43.544993,
      longitude: -5.664037,
      pathImage: 'pelayo.jpg',
      locality: 'Gijón',
      interest: 'Escultura',
      address: 'Plaza del Marqués, 1, 33201 Gijón, Asturias',
      metadataImage: {
        filename: 'pelayo.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      },
      score: 5,
      average: 2
    }
  ];

  listRecommendedActivities = [
    {
      id: 1,
      name: 'Universidad Laboral',
      description: 'Universidad situada en Gijón',
      latitude: 43.524088,
      longitude: -5.614049,
      pathImage: 'universidad.jpg',
      locality: 'Gijón',
      interest: 'Iglesia',
      address: 'Universidad Laboral, Calle José Luis Álvarez Margaride, Cabueñes, La Guía, Distrito Rural, Gijón, 33394, España',
      metadataImage: {
        filename: 'universidad.jpg',
        mimeType: 'image/jpg',
        data: 'E3uTRf1oyGPBx0S5zlxdwQhA7WwLoNmf/9k=',
      },
      score: 1.99999,
      average: 2
    },
    {
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
      },
      score: 0.5,
      average: 2
    }
  ];

  getActivities(): Observable<Activity[]> {
    return of(this.listActivities);
  }

  deleteActivity(id): Observable<any> {
    this.listActivities = this.listActivities.filter(p => p.id !== id);
    return of({
      mensaje: 'La actividad ha sido eliminada'
    });
  }

  addActivity(formData): Observable<any> {
    var activityToAdd = {
      id: this.listActivities[this.listActivities.length - 1].id + 1,
      name: formData.get('name'),
      description:  formData.get('description'),
      latitude: formData.get('latitude'),
      longitude: formData.get('longitude'),
      pathImage: '',
      locality: formData.get('city'),
      interest: formData.get('interest'),
      address: formData.get('address'),
      metadataImage: {
        filename: '',
        mimeType: '',
        data: '',
      }
    }
    this.listActivities.push(activityToAdd);
    return of({
      mensaje: 'La actividad ha sido añadida'
    });
  }

  getRatedActivities(user): Observable<ActivityRecommended[]>{
    return of(this.listActivitiesRated);
  }

  getRecommendedActivities(idUser): Observable<ActivityRecommended[]> {
    return of(this.listRecommendedActivities);
  }

  editActivity(id, activity): Observable<any> {
    // ERROR. El observer se llamaba antes
    const updateItem = this.listActivities.find(acti => acti.id === id);
    const index = this.listActivities.indexOf(updateItem);

    var cityToEdit = {
      id: id,
      name: activity.get('name'),
      description:  activity.get('description'),
      latitude: activity.get('latitude'),
      longitude: activity.get('longitude'),
      pathImage: updateItem.pathImage,
      locality: activity.get('city'),
      interest: activity.get('interest'),
      address: activity.get('address'),
      metadataImage: {
        filename: updateItem.metadataImage.filename,
        mimeType: updateItem.metadataImage.mimeType,
        data: updateItem.metadataImage.data,
      }
    }
    this.listActivities[index] = cityToEdit;
    return of({
      mensaje: 'La actividad ha sido modificada'
    });
  }

  getActivity(id): Observable<Activity> {
    const activity = this.listActivities.find(p => p.id === id);
    return of(activity);
  }

  postRateActivity(activityRate): Observable<any> {
    this.listRecommendedActivities.push(activityRate);
    return of({
      mensaje: 'La actividad ha sido valorada'
    });
  }


}
