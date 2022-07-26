import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock: HttpTestingController;
  const username = 'Dariia';
  const url = `http://localhost:3000/profiles/${username}`;
  const profile = {
    profile: {
      username: 'string',
      bio: 'string',
      image: 'string',
      following: true,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProfileService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Then:  call getProfile method', () => {
    service.getProfile(username).subscribe((data) => {
      expect(data).toEqual(profile);
    });
    const request = httpMock.expectOne(url);
    expect(request.request.method).toBe('GET');
    request.flush(profile);
    httpMock.verify();
  });
  it('Then: call followUser method', () => {
    service.followUser(username).subscribe((data) => {
      expect(data).toEqual(profile);
    });
    const request = httpMock.expectOne(`${url}/follow`);
    expect(request.request.method).toBe('POST');
    request.flush(profile);
    httpMock.verify();
  });
  it('Then:  call unFollowUser method', () => {
    service.unFollowUser(username).subscribe((data) => {
      expect(data).toEqual(profile);
    });
    const request = httpMock.expectOne(`${url}/follow`);
    expect(request.request.method).toBe('DELETE');
    request.flush(profile);
    httpMock.verify();
  });
});
