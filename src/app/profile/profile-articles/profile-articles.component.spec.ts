import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { of, Subject } from 'rxjs';
import { ArticlesService } from 'src/app/shared/services/articles.service';

import { ProfileArticlesComponent } from './profile-articles.component';

describe('ProfileArticlesComponent', () => {
  let component: ProfileArticlesComponent;
  let fixture: ComponentFixture<ProfileArticlesComponent>;
  let articlesService: ArticlesService;

  const articles = {
    articles: [
      {
        slug: 'string',
        title: 'string',
        description: 'string',
        body: 'string',
        tagList: ['string'],
        createdAt: '2022-05-04T09:24:12.831Z',
        updatedAt: '2022-05-04T09:24:12.831Z',
        favorited: true,
        favoritesCount: 0,
        author: {
          username: 'string',
          bio: 'string',
          image: 'string',
          following: true,
        },
      },
    ],
    articlesCount: 0,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileArticlesComponent],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            favoriteArticles$: of([]),
            articlesByAuthor$: of([]),
            getByAuthor: () => of(articles),
            getFavoriteArticles: () => of(articles),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileArticlesComponent);
    component = fixture.componentInstance;
    component.username = 'Dariia';
    component.type$ = new Subject<string>();
    articlesService = TestBed.inject(ArticlesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    const componentSpy = spyOn(component.type$, 'subscribe').and.callThrough();
    component.type$.next('favorites');
    component.ngOnInit();
    component.type$.next('author');
    component.ngOnInit();
    expect(component).toBeTruthy();
    expect(componentSpy).toHaveBeenCalled();
  });
  describe('Function getFavoriteArticles', () => {
    it('Then: call getFavoriteArticles', () => {
      const componentSpy = spyOn(component, 'getFavoriteArticles').and.callThrough();
      component.getFavoriteArticles();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call ArticlesService from getFavoriteArticles', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'getFavoriteArticles').and.returnValue(of());
      component.getFavoriteArticles();
      expect(serviceSpy).toHaveBeenCalled();
      expect(component.length).toBe(articles.articlesCount);
    }));
  });
  describe('Function getArticlesByAuthor', () => {
    it('Then: call getArticlesByAuthor', () => {
      const componentSpy = spyOn(component, 'getArticlesByAuthor').and.callThrough();
      component.getArticlesByAuthor();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call ArticlesService from getArticlesByAuthor', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'getByAuthor').and.returnValue(of());
      component.getArticlesByAuthor();
      expect(serviceSpy).toHaveBeenCalled();
      expect(component.length).toBe(articles.articlesCount);
    }));
  });
  describe('Function changesPage', () => {
    it('Then: call changesPage', () => {
      const componentSpy = spyOn(component, 'changesPage').and.callThrough();
      const event = new PageEvent();
      component.type = 'author';
      component.changesPage(event);
      component.type = 'favorites';
      component.changesPage(event);
      component.type = '';
      component.changesPage(event);
      expect(componentSpy).toHaveBeenCalledTimes(3);
    });
  });
});
