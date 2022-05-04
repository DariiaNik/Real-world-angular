import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

import { SingUpComponent } from './sing-up.component';

describe('SingUpComponent', () => {
  let component: SingUpComponent;
  let fixture: ComponentFixture<SingUpComponent>;
  let authorizationService: AuthorizationService;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  const user = {
    user: {
      email: 'string',
      token: 'string',
      username: 'string',
      bio: 'string',
      image: 'string',
    },
  };
  const errorResponse = new HttpErrorResponse({
    error: { errors: { 'email or password': ['is invalid'] } },
    status: 400,
    statusText: 'Bad Request',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingUpComponent],
      providers: [
        {
          provide: AuthorizationService,
          useValue: {
            register: () => of(user),
          },
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingUpComponent);
    component = fixture.componentInstance;
    authorizationService = TestBed.inject(AuthorizationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Function singUp', () => {
    it('Then: call singUp', () => {
      const componentSpy = spyOn(component, 'singUp').and.callThrough();
      component.singUp();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call singIn with valid form', () => {
      const componentSpy = spyOn(component, 'singUp').and.callThrough();
      component.form.controls['email'].setValue('test@example.com');
      component.form.controls['password'].setValue('test');
      component.form.controls['username'].setValue('test');
      component.singUp();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: AuthorizationService return error', fakeAsync(() => {
      const serviceSpy = spyOn(authorizationService, 'register').and.returnValue(throwError(() => errorResponse));
      component.form.controls['email'].setValue('test@example.com');
      component.form.controls['password'].setValue('test');
      component.form.controls['username'].setValue('test');
      component.singUp();
      expect(serviceSpy).toHaveBeenCalled();
      flush();
    }));
  });
});
