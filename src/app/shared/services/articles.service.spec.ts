import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ArticlesService } from './articles.service';
import { ResponseMultiArticles } from 'src/app/shared/models/response-multi-articles-interface';
import { ResponseArticle } from 'src/app/shared/models/response-article-interface';
import { Article } from 'src/app/shared/models/article-interface';

describe('ArticlesService', () => {
  let service: ArticlesService;
  let httpMock: HttpTestingController;
  let username = 'Dariia';
  let url = 'http://api.realworld.io/api/articles?limit=5&offset=0';
  const article: Article = {
    slug: 'string',
    title: 'string',
    description: 'string',
    body: 'string',
    tagList: ['string'],
    createdAt: '2022-05-04T14:14:02.439Z',
    updatedAt: '2022-05-04T14:14:02.439Z',
    favorited: true,
    favoritesCount: 0,
    author: {
      username: 'string',
      bio: 'string',
      image: 'string',
      following: true,
    },
  };
  const articles: ResponseMultiArticles = {
    articles: [article],
    articlesCount: 2,
  };

  const responseArticle = {
    article: article,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticlesService],
    }).compileComponents();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArticlesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get multiply articles', () => {
    it('Then: call getAll method', () => {
      service.getAll().subscribe((data: ResponseMultiArticles) => {
        expect(data).toEqual(articles);
      });
      const request = httpMock.expectOne(url);
      expect(request.request.method).toBe('GET');
      request.flush(articles);
      httpMock.verify();
    });
    it('Then: call getByAuthor method', () => {
      service.getByAuthor(username).subscribe((data: ResponseMultiArticles) => {
        expect(data).toEqual(articles);
      });
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles?author=${username}&limit=5&offset=0`);
      expect(request.request.method).toBe('GET');
      request.flush(articles);
      httpMock.verify();
    });
    it('Then:  call getByTag method', () => {
      service.getByTag(username).subscribe((data: ResponseMultiArticles) => {
        expect(data).toEqual(articles);
      });
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles?tag=${username}&limit=5&offset=0`);
      expect(request.request.method).toBe('GET');
      request.flush(articles);
      httpMock.verify();
    });
    it('Then:  call getFavoriteArticles method', () => {
      service.getFavoriteArticles(username).subscribe((data: ResponseMultiArticles) => {
        expect(data).toEqual(articles);
      });
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles?favorited=${username}&limit=5&offset=0`);
      expect(request.request.method).toBe('GET');
      request.flush(articles);
      httpMock.verify();
    });
  });
  describe('Get single article', () => {
    it('Then:  call getBySlug method', () => {
      service.getBySlug(username).subscribe((data) => {
        expect(data).toEqual(article);
      });
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles/${username}`);
      expect(request.request.method).toBe('GET');
      request.flush(responseArticle);
      httpMock.verify();
    });
  });
  describe('Post article', () => {
    it('Then: call createArticle method', () => {
      service.createArticle(article).subscribe((data) => {
        expect(data).toEqual(article);
      });
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles`);
      expect(request.request.method).toBe('POST');
      request.flush(article);
      httpMock.verify();
    });
  });
  describe('Edit article', () => {
    it('Then: call updateArticle method', () => {
      service.updateArticle(article, username).subscribe((data) => {
        expect(data).toEqual(article);
      });
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles/${username}`);
      expect(request.request.method).toBe('PUT');
      request.flush(article);
      httpMock.verify();
    });
    it('Then:  call deleteArticle method', () => {
      service.deleteArticle(username).subscribe();
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles/${username}`);
      expect(request.request.method).toBe('DELETE');
      httpMock.verify();
    });
    it('Then: call favouriteArticle method', () => {
      service.favouriteArticle(username).subscribe();
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles/${username}/favorite`);
      expect(request.request.method).toBe('POST');
      httpMock.verify();
    });
    it('Then: call unFavouriteArticle method', () => {
      service.unFavouriteArticle(username).subscribe();
      const request = httpMock.expectOne(`http://api.realworld.io/api/articles/${username}/favorite`);
      expect(request.request.method).toBe('DELETE');
      httpMock.verify();
    });
  });
});
