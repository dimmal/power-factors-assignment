import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AUTH_TOKEN } from '../static/auth';

@Injectable()
export class HTTPInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${AUTH_TOKEN}`)
    });

    return next.handle(authReq);
  }
}