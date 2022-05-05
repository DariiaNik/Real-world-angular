import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

import { AuthorizationInterceptor } from './authorization.interceptor';

describe('AuthorizationInterceptor', () => {
  const testUrl = '/data';
  interface Data {
    name: string;
  }
  let authorizationInterceptor: AuthorizationInterceptor;
  let authService: AuthorizationService;
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInterceptor,
          multi: true,
        },
        { provide: AuthorizationInterceptor },
        {
          provide: AuthorizationService,
          useValue: {
            isAuthenticated: () => of(true),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => of(),
          },
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthorizationService);
    authorizationInterceptor = TestBed.inject(AuthorizationInterceptor);
  });

  it('should be created', () => {
    const interceptor: AuthorizationInterceptor = TestBed.inject(AuthorizationInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('Then: handle HttpErrorResponse ', () => {
    const emsg = ' 401 error';
    spyOn(console, 'log');

    httpClient.get<Data>(testUrl).subscribe({
      next: (res) => fail('should have failed with the 401 error'),
      error: (error: HttpErrorResponse) => {
        expect(error.error).toEqual(emsg);
      },
    });
    const req = httpMock.expectOne(testUrl);
    req.flush(emsg, { status: 401, statusText: 'Unauthorized' });

    expect(console.log).toHaveBeenCalled();
  });
  it('Then: handle HttpErrorResponse case ErrorEvent', () => {
    const emsg = ' 401 error';
    spyOn(console, 'log');

    httpClient.get<Data>(testUrl).subscribe({
      next: (res) => fail('should have failed with the 401 error'),
      error: (error: HttpErrorResponse) => {
        expect(console.log).toHaveBeenCalled();
      },
    });
    const req = httpMock.expectOne(testUrl);
    req.error(new ErrorEvent('the error message'), { status: 401, statusText: 'Unauthorized' });
  });
});
