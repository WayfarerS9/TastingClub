import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { Utils } from '../auth.utils';

@Injectable({
  providedIn: 'root',
})
export class UserInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  intercept(req: any, next: any) {
    let authService = this.injector.get(Utils);
    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`,
        'Access-Control-Allow-Origin': '**',
      },
    });
    return next.handle(tokenizedReq);
  }
}
