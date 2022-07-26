import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { UserService } from 'src/app/shared/services/user.service';

import { ArticlePageComponent } from './article-page.component';

describe('ArticlePageComponent', () => {
  let component: ArticlePageComponent;
  let fixture: ComponentFixture<ArticlePageComponent>;
  let articlesService: ArticlesService;
  const routerSpy = { navigate: jasmine.createSpy('navigate') };
  const slug = 'slug';
  const username = 'Dariia';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ArticlePageComponent],
      imports: [HttpClientModule],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            getBySlug: () => of({}),
            favouriteArticle: () => of({}),
            unFavouriteArticle: () => of({}),
            deleteArticle: () => of({}),
          },
        },
        {
          provide: UserService,
          useValue: {
            getUser: () => of({}),
          },
        },
        {
          provide: ProfileService,
          useValue: {
            followUser: () => of({}),
            unFollowUser: () => of({}),
          },
        },
        {
          provide: Router,
          useValue: routerSpy,
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
    fixture = TestBed.createComponent(ArticlePageComponent);
    component = fixture.componentInstance;
    articlesService = TestBed.inject(ArticlesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('Function deleteArticle', () => {
    it('Then: call deleteArticle', () => {
      const componentSpy = spyOn(component, 'deleteArticle').and.callThrough();
      component.deleteArticle(slug);
      expect(componentSpy).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/home']);
    });
    it('Then: call ArticlesService from deleteArticle', fakeAsync(() => {
      const serviceSpy = spyOn(articlesService, 'deleteArticle').and.returnValue(of());
      component.deleteArticle(slug);
      expect(serviceSpy).toHaveBeenCalled();
    }));
  });
  describe('Function follow', () => {
    it('Then: call follow', () => {
      const componentSpy = spyOn(component, 'follow').and.callThrough();
      component.follow(username);
      expect(componentSpy).toHaveBeenCalled();
    });
  });
  describe('Function unFollow', () => {
    it('Then: call unFollow', () => {
      const componentSpy = spyOn(component, 'unFollow').and.callThrough();
      component.unFollow(username);
      expect(componentSpy).toHaveBeenCalled();
    });
  });
  describe('Function favouriteArticle', () => {
    it('Then: call favouriteArticle', () => {
      const componentSpy = spyOn(component, 'favouriteArticle').and.callThrough();
      component.favouriteArticle(username);
      expect(componentSpy).toHaveBeenCalled();
    });
  });
  describe('Function unFavouriteArticle', () => {
    it('Then: call unFavouriteArticle', () => {
      const componentSpy = spyOn(component, 'unFavouriteArticle').and.callThrough();
      component.unFavouriteArticle(username);
      expect(componentSpy).toHaveBeenCalled();
    });
  });
});
