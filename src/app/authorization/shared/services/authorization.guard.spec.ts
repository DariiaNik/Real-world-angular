import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

import { AuthorizationGuard } from './authorization.guard';

describe('AuthorizationGuard', () => {
  let guard: AuthorizationGuard;
  let authorizationService: AuthorizationService;
  let mockRoute: ActivatedRouteSnapshot;
  const fakeUrls = '/test';
  function fakeRouterState(url: string): RouterStateSnapshot {
    return {
      url,
    } as RouterStateSnapshot;
  }
  const state = fakeRouterState(fakeUrls);
  const router = {
    navigate: jasmine.createSpy('navigate'),
  };
  class MockActivatedRouteSnapshot {
    private _data: any;

    get data() {
      return this._data;
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, CommonModule, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRouteSnapshot,
          useClass: MockActivatedRouteSnapshot,
        },
        {
          provide: AuthorizationService,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthorizationGuard);
    authorizationService = TestBed.inject(AuthorizationService);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
  it('If user is login', () => {
    authorizationService.isAuthenticated = () => true;
    expect(guard.canActivate(mockRoute, state)).toBe(true);
  });
  it('If user is not login', () => {
    authorizationService.isAuthenticated = () => false;
    expect(guard.canActivate(mockRoute, state)).toBe(false);
  });
});
