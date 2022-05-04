import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
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
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
