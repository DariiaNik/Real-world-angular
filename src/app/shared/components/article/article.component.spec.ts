import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ArticlesService } from 'src/app/shared/services/articles.service';

import { ArticleComponent } from './article.component';

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;
  let articlesService: ArticlesService;
  let article = {
    article: {
      slug: 'string',
      title: 'string',
      description: 'string',
      body: 'string',
      tagList: ['string'],
      createdAt: '2022-05-04T12:39:18.347Z',
      updatedAt: '2022-05-04T12:39:18.347Z',
      favorited: true,
      favoritesCount: 0,
      author: {
        username: 'string',
        bio: 'string',
        image: 'string',
        following: true,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticleComponent],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            favouriteArticle: () => of(article),
            unFavouriteArticle: () => of(article),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    component.article = {
      slug: 'string',
      title: 'string',
      description: 'string',
      body: 'string',
      tagList: ['string'],
      createdAt: '2022-04-29T14:50:52.953Z',
      updatedAt: '2022-04-29T14:50:52.953Z',
      favorited: true,
      favoritesCount: 0,
      author: {
        username: 'string',
        bio: 'string',
        image: 'string',
        following: true,
      },
    };
    articlesService = TestBed.inject(ArticlesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Function favouriteClick', () => {
    it('Then: call favouriteClick if article favorited', () => {
      const componentSpy = spyOn(component, 'favouriteClick').and.callThrough();
      component.favouriteClick();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call favouriteClick if article unFavorited', () => {
      const componentSpy = spyOn(component, 'favouriteClick').and.callThrough();
      component.article.favorited = false;
      component.favouriteClick();
      expect(componentSpy).toHaveBeenCalled();
    });
  });
  describe('Function favouriteClick call articlesService', () => {
    it('Then: call favouriteArticle method if article unFavorited', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'favouriteArticle').and.returnValue(of());
      component.article.favorited = false;
      component.favouriteClick();
      expect(serviceSpy).toHaveBeenCalled();
      flush();
    }));
    it('Then: call unFavouriteArticle method if article favorited', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'unFavouriteArticle').and.returnValue(of());
      component.favouriteClick();
      expect(serviceSpy).toHaveBeenCalled();
      flush();
    }));
  });
  describe('Different type of articles', () => {
    beforeEach(() => {
      spyOn(component, 'favouriteClick').and.callThrough();
    });
    afterEach(() => {
      component.favouriteClick();
      expect(component.favouriteClick).toHaveBeenCalled();
    });
    it('Then: call with global type', () => {
      component.type = 'global';
    });
    it('Then: call with your type', () => {
      component.type = 'your';
    });
    it('Then: call with favorites type', () => {
      component.type = 'favorites';
    });
    it('Then: call with author type', () => {
      component.type = 'author';
    });
    it('Then: call with another type', () => {
      component.type = 'another';
    });
  });
});
