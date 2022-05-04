import { TestBed } from '@angular/core/testing';
import { UserService } from 'src/app/shared/services/user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const user = {
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
      imports: [HttpClientTestingModule],
      providers: [UserService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Then: method call getUser method', () => {
    service.getUser().subscribe((data) => {
      expect(data).toEqual(user.user);
    });
    const request = httpMock.expectOne('http://api.realworld.io/api/user');
    expect(request.request.method).toBe('GET');
    request.flush(user);
    httpMock.verify();
  });
  it('Then: method call updateUser method', () => {
    service.updateUser(user.user).subscribe((data) => {
      expect(data).toEqual(user);
    });
    const request = httpMock.expectOne('http://api.realworld.io/api/user');
    expect(request.request.method).toBe('PUT');
    request.flush(user);
    httpMock.verify();
  });
});
