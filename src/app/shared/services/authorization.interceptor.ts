import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthorizationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      const cloned = request.clone({
        setHeaders: { Authorization: 'Token ' + this.authService.token },
      });
      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
  }
}
