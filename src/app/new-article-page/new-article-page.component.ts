import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ResponseArticle } from 'src/app/shared/models/response-article-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-new-article-page',
  templateUrl: './new-article-page.component.html',
  styleUrls: ['./new-article-page.component.scss'],
})
export class NewArticlePageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  form!: FormGroup;
  article!: Article;
  isFormReady: boolean = false;
  errorMesages!: string;
  constructor(
    readonly articlesService: ArticlesService,
    readonly router: Router,
    readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      body: new FormControl(''),
      tagList: new FormControl(''),
    });

    this.getArticleBySlug();
  }

  private updateForm() {
    this.form.patchValue({
      title: this.article.title,
      description: this.article.description,
      body: this.article.body,
      tagList: this.article.tagList,
    });
    this.isFormReady = true;
  }

  private getArticleBySlug() {
    const getArticleBySlugSubscription: Subscription = this.route.params
      .pipe(
        switchMap((params: Params) => {
          if (params['slug']) {
            return this.articlesService.getBySlug(params['slug']);
          }
          const result$ = new Observable<any>();
          this.isFormReady = true;
          return result$;
        })
      )
      .subscribe((article: Article) => {
        this.article = article;
        this.updateForm();
      });

    this.subscriptions.push(getArticleBySlugSubscription);
  }

  private updateArticle(article: Article) {
    const updateArticleSubscription: Subscription = this.articlesService
      .updateArticle(article, this.article.slug)
      .subscribe({
        next: (response: ResponseArticle) => {
          this.router.navigate([`/article/${response.article.slug}`]);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMesages = error.error.error;
        },
      });
    this.subscriptions.push(updateArticleSubscription);
  }

  private createArticle(article: Article) {
    const createArticleSubscription: Subscription = this.articlesService
      .createArticle(article)
      .subscribe({
        next: (response: ResponseArticle) => {
          this.router.navigate([`/article/${response.article.slug}`]);
        },
        error: (error: HttpErrorResponse) => {
          this.errorMesages = error.error.error;
        },
      });
    this.subscriptions.push(createArticleSubscription);
  }

  public publishArticle() {
    const article = {
      ...this.form.value,
      tagList: this.form.value.tagList.toString().split(','),
    };
    if (this.article) {
      this.updateArticle(article);
    } else {
      this.createArticle(article);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
