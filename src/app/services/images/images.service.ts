import { Injectable } from '@angular/core';
import {Activity} from '../../models/activity';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const cabecera = {headers: new HttpHeaders({'Content-Type': 'application/json'})};


@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  imagesURL = 'http://localhost:8090/images';

  constructor(private httpClient: HttpClient) { }

  getImages(namePhoto){
    return this.httpClient.get<any>(this.imagesURL + '/' + namePhoto);
  }
}
