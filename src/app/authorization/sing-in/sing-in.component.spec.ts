import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

import { SingInComponent } from './sing-in.component';

describe('SingInComponent', () => {
  let component: SingInComponent;
  let fixture: ComponentFixture<SingInComponent>;
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
      declarations: [SingInComponent],
      providers: [
        {
          provide: AuthorizationService,
          useValue: {
            login: () => of(user),
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
    fixture = TestBed.createComponent(SingInComponent);
    component = fixture.componentInstance;
    authorizationService = TestBed.inject(AuthorizationService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Function singIn', () => {
    it('Then: call singIn', () => {
      const componentSpy = spyOn(component, 'singIn').and.callThrough();
      component.singIn();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call singIn with valid form', () => {
      const componentSpy = spyOn(component, 'singIn').and.callThrough();
      component.form.controls['email'].setValue('test@example.com');
      component.form.controls['password'].setValue('test');
      component.singIn();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: AuthorizationService return error', fakeAsync(() => {
      const serviceSpy = spyOn(authorizationService, 'login').and.returnValue(throwError(() => errorResponse));
      component.form.controls['email'].setValue('test@example.com');
      component.form.controls['password'].setValue('test');
      component.singIn();
      expect(serviceSpy).toHaveBeenCalled();
      flush();
    }));
  });
});
