import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TagsService } from './tags.service';
import { environment } from 'src/environments/environment';

describe('TagsService', () => {
  let service: TagsService;
  let httpMock: HttpTestingController;
  const someTags = {
    tags: ['string'],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TagsService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('Then: method call getTags method', () => {
    service.getTags().subscribe((tags: Object) => {
      expect(tags).toEqual(someTags.tags);
    });
    const request = httpMock.expectOne(`${environment.apiUrl}tags`);
    expect(request.request.method).toBe('GET');
    request.flush(someTags);
    httpMock.verify();
  });
});
