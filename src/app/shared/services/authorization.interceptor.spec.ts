import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

import { AuthorizationInterceptor } from './authorization.interceptor';

describe('AuthorizationInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
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
    })
  );

  it('should be created', () => {
    const interceptor: AuthorizationInterceptor = TestBed.inject(AuthorizationInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
