import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthorizationService } from './authorization.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('AuthorizationService', () => {
  let service: AuthorizationService;
  let httpMock: HttpTestingController;
  const user = {
    user: {
      email: 'string',
      password: 'string',
    },
  };
  const newUser = {
    user: {
      username: 'string',
      email: 'string',
      password: 'string',
    },
  };
  const userResponse = {
    user: {
      email: 'string',
      token: 'string',
      username: 'string',
      bio: 'string',
      image: 'string',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ReactiveFormsModule],
      providers: [AuthorizationService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Then: call login method', () => {
    service.login(user.user).subscribe((data) => {
      expect(data).toBeTruthy();
    });
    const request = httpMock.expectOne('http://localhost:3000/users/login');
    expect(request.request.method).toBe('POST');
    request.flush(userResponse);
    httpMock.verify();
  });
  it('Then: call register method', () => {
    service.register(newUser.user).subscribe((data) => {
      expect(data).toBeTruthy();
    });
    const request = httpMock.expectOne('http://localhost:3000/users');
    expect(request.request.method).toBe('POST');
    request.flush(userResponse);
    httpMock.verify();
  });
  it('Then: call logout method', () => {
    const serviceSpy = spyOn(service, 'logout').and.callThrough();
    service.logout();
    expect(serviceSpy).toHaveBeenCalled();
  });
  it('Then: call isAuthenticated method', () => {
    const serviceSpy = spyOn(service, 'isAuthenticated').and.callThrough();
    service.isAuthenticated();
    expect(serviceSpy).toHaveBeenCalled();
  });
});
