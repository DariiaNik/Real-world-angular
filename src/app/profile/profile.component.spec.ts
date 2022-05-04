import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UserService } from 'src/app/shared/services/user.service';

import { ProfileComponent } from './profile.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let profileService: ProfileService;
  const username = 'Dariia';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      providers: [
        {
          provide: ProfileService,
          useValue: {
            getProfile: () => of({}),
            followUser: () => of({}),
            unFollowUser: () => of({}),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: () => of({}),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Function following', () => {
    it('Then: call following', () => {
      const componentSpy = spyOn(component, 'following').and.callThrough();
      component.following(username);
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call profileService from following', fakeAsync(() => {
      const serviceSpy = spyOn(profileService, 'followUser').and.returnValue(of({}));
      component.following(username);
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });
  describe('Function unFollowing', () => {
    it('Then: call unFollowing', () => {
      const componentSpy = spyOn(component, 'unFollowing').and.callThrough();
      component.unFollowing(username);
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call profileService from unFollowing', fakeAsync(() => {
      const serviceSpy = spyOn(profileService, 'unFollowUser').and.returnValue(of({}));
      component.unFollowing(username);
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });
  describe('Function getType', () => {
    it('Then: call getType', () => {
      const componentSpy = spyOn(component, 'getType').and.callThrough();
      component.getType(username);
      expect(componentSpy).toHaveBeenCalled();
      expect(component.type).toBe(username);
    });
  });
});
