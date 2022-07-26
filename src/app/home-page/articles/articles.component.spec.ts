import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { of, Subject } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { UserService } from 'src/app/shared/services/user.service';

import { ArticlesComponent } from './articles.component';

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let articlesService: ArticlesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlesComponent],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            getAll: () => of({}),
            getByTag: () => of({}),
            getFeedArticles: () => of({}),
          },
        },
        {
          provide: AuthorizationService,
          useValue: {
            isAuthenticated: () => of(true),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: () => of({}),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    component.type$ = new Subject<string>();
    component.tagName$ = new Subject<string>();
    articlesService = TestBed.inject(ArticlesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Function getFavoriteArticles', () => {
    it('Then: call getFavoriteArticles', () => {
      const componentSpy = spyOn(component, 'getFeedArticles').and.callThrough();
      component.getFeedArticles();
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call ArticlesService from getFavoriteArticles', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'getFeedArticles').and.returnValue(of());
      component.getFeedArticles();
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });
  describe('Function getArticlesByTag', () => {
    it('Then: call getArticlesByTag', () => {
      const componentSpy = spyOn(component, 'getArticlesByTag').and.callThrough();
      component.getArticlesByTag('First');
      expect(componentSpy).toHaveBeenCalled();
    });
    it('Then: call ArticlesService from getArticlesByTag', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'getByTag').and.returnValue(of());
      component.getArticlesByTag('tag');
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });
  describe('Function changesPage', () => {
    it('Then: call changesPage', () => {
      const componentSpy = spyOn(component, 'changesPage').and.callThrough();
      const event = new PageEvent();
      component.type = 'your';
      component.changesPage(event);
      component.type = 'global';
      component.changesPage(event);
      component.type = '';
      component.changesPage(event);
      expect(componentSpy).toHaveBeenCalledTimes(3);
    });
  });
});
