import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ResponseArticle } from 'src/app/shared/models/response-article-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { NewArticlePageComponent } from './new-article-page.component';

describe('NewArticlePageComponent', () => {
  let component: NewArticlePageComponent;
  let fixture: ComponentFixture<NewArticlePageComponent>;
  let articlesService: ArticlesService;
  let route: ActivatedRoute;

  const article: Article = {
    slug: 'string',
    title: 'string',
    description: 'string',
    body: 'string',
    tagList: ['string'],
    createdAt: '2022-05-04T14:23:46.623Z',
    updatedAt: '2022-05-04T14:23:46.623Z',
    favorited: true,
    favoritesCount: 0,
    author: {
      username: 'string',
      bio: 'string',
      image: 'string',
      following: true,
    },
  };

  const responseArticle: ResponseArticle = {
    article,
  };
  const errorResponse = new HttpErrorResponse({
    error: { errors: { 'email or password': ['is invalid'] } },
    status: 400,
    statusText: 'Bad Request',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [NewArticlePageComponent],
      providers: [
        {
          provide: ArticlesService,
          useValue: {
            getBySlug: () => of(article),
            updateArticle: () => of(article),
            createArticle: () => of(article),
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: () => of(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
          },
        },
      ],
    });
  });

  describe('Without slug', () => {
    beforeEach(() => {
      TestBed.compileComponents();
      fixture = TestBed.createComponent(NewArticlePageComponent);
      component = fixture.componentInstance;
      articlesService = TestBed.inject(ArticlesService);
      route = TestBed.inject(ActivatedRoute);
      fixture.detectChanges();
      component.form.controls['title'].setValue('test');
      component.form.controls['description'].setValue('test');
      component.form.controls['body'].setValue('test');
      component.form.controls['tagList'].setValue('test');
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
    describe('Create new article', () => {
      it('Then: call publishArticle if article is empty', () => {
        const componentSpy = spyOn(component, 'publishArticle').and.callThrough();
        component.publishArticle();
        expect(componentSpy).toHaveBeenCalled();
      });
      it('Then: call updateArticle from articlesService ', () => {
        const serviceSpy = spyOn(articlesService, 'createArticle').and.returnValue(
          of(responseArticle)
        );
        component.publishArticle();
        expect(serviceSpy).toHaveBeenCalled();
      });
      it('Then: call updateArticle from articlesService  with error', () => {
        const serviceSpy = spyOn(articlesService, 'createArticle').and.returnValue(
          throwError(() => errorResponse)
        );
        component.publishArticle();
        expect(serviceSpy).toHaveBeenCalled();
      });
    });
    describe('Update existing article', () => {
      beforeEach(() => {
        component.article = article;
      });
      it('Then: call updateArticle from articlesService ', () => {
        const serviceSpy = spyOn(articlesService, 'updateArticle').and.returnValue(
          of(responseArticle)
        );
        component.publishArticle();
        expect(serviceSpy).toHaveBeenCalled();
      });
      it('Then: call updateArticle from articlesService  with error', () => {
        const serviceSpy = spyOn(articlesService, 'updateArticle').and.returnValue(
          throwError(() => errorResponse)
        );
        component.publishArticle();
        expect(serviceSpy).toHaveBeenCalled();
      });
    });
  });
  describe('With slug', () => {
    beforeEach(() => {
      TestBed.overrideProvider(ActivatedRoute, {
        useValue: {
          params: of({ slug: 'sdf' }),
        },
      });
      TestBed.compileComponents();
      fixture = TestBed.createComponent(NewArticlePageComponent);
      component = fixture.componentInstance;
      articlesService = TestBed.inject(ArticlesService);
      route = TestBed.inject(ActivatedRoute);
      fixture.detectChanges();
      component.form.controls['title'].setValue('test');
      component.form.controls['description'].setValue('test');
      component.form.controls['body'].setValue('test');
      component.form.controls['tagList'].setValue('test');
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
