import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {isPlatformBrowser} from '@angular/common';

// Middleware for sending Auth token to server in every request
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(@Inject(PLATFORM_ID) private platformId: any ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (isPlatformBrowser(this.platformId)) { // In case of SSR
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${window.localStorage.getItem('Auth')}`,
        },
      });
    }
    return next.handle(request);
  }
}
