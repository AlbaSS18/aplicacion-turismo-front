import { Injectable } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LocalStorageService} from '../services/local-storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})

export class InterceptorService implements HttpInterceptor{

  constructor(private localStorageService: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let autReq = req;
    const token = this.localStorageService.getToken();
    if (token != null) {
      autReq = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
    }
    return next.handle(autReq);
  }
}
export const interceptorProvider = [{provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}];

