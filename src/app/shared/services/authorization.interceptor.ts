import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(private authService: AuthorizationService, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.authService.isAuthenticated()) {
      request = request.clone({
        setHeaders: { 'x-access-token': `${this.authService.token}` },
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.statusText === 'Unauthorized' || error.statusText === 'Forbidden') {
          this.authService.logout();
          this.router.navigate(['/auth', 'login']);
        } else {
          if (error.error instanceof ErrorEvent) {
            console.log('This is client side error');
            errorMsg = `Error: ${error.error.message}`;
          } else {
            console.log('This is server side error');
            errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          }
          console.log(errorMsg);
        }
        return throwError(() => error);
      })
    );
  }
}
