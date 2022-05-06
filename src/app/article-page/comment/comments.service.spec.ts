import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommentsService } from './comments.service';

describe('CommentsService', () => {
  let service: CommentsService;
  let httpMock: HttpTestingController;
  const slug = 'Create-a-new-implementation-1';
  const url = `https://api.realworld.io/api/articles/${slug}/comments`;
  const someComments = {
    comments: [
      {
        id: 0,
        createdAt: '2022-05-03T12:27:05.762Z',
        updatedAt: '2022-05-03T12:27:05.762Z',
        body: 'string',
        author: {
          username: 'string',
          bio: 'string',
          image: 'string',
          following: true,
        },
      },
    ],
  };
  const comment = {
    comment: {
      author: {
        username: 'Dariia8',
        bio: 'Hello!!!',
        image: 'http://artist.com/art-recognition-and-education/wp…ia-files/2015/11/minimalist-art-minimalism-13.jpg',
        following: false,
      },
      body: 'Holla',
      createdAt: '2022-05-03T13:13:12.512Z',
      id: 11398,
      updatedAt: '2022-05-03T13:13:12.512Z',
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CommentsService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommentsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Then:  call getComments method', () => {
    service.getComments(slug).subscribe((data) => {
      expect(data).toEqual(someComments.comments);
    });
    const request = httpMock.expectOne(`${url}`);
    expect(request.request.method).toBe('GET');
    request.flush(someComments);
    httpMock.verify();
  });
  it('Then: call addComments method', () => {
    service.addComments(slug, someComments.comments[0]).subscribe((data) => {
      expect(data).toEqual(comment.comment);
    });
    const request = httpMock.expectOne(`${url}`);
    expect(request.request.method).toBe('POST');
    request.flush(comment.comment);
    httpMock.verify();
  });
  it('Then: call deleteComment method', () => {
    service.deleteComment(slug, 1).subscribe();
    const request = httpMock.expectOne(`${url}/1`);
    expect(request.request.method).toBe('DELETE');
    httpMock.verify();
  });
});
