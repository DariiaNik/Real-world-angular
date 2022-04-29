import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-new-article-page',
  templateUrl: './new-article-page.component.html',
  styleUrls: ['./new-article-page.component.scss'],
})
export class NewArticlePageComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  article!: Article;
  isFormReady: boolean = false;
  subscriptions: Subscription[] = [];
  errorMesages!: string;

  constructor(private articlesService: ArticlesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
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
          } else {
            const result$ = new Observable<any>();
            this.isFormReady = true;
            return result$;
          }
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
        next: () => {
          this.router.navigate(['/home']);
        },
        error: (error: HttpErrorResponse) => {
          const errors = Object.entries(error.error.errors)
            .map((entries) => entries.join(' '))
            .join(',');
          this.errorMesages = errors;
        },
      });
    this.subscriptions.push(updateArticleSubscription);
  }

  private createArticle(article: Article) {
    const createArticleSubscription: Subscription = this.articlesService.createArticle(article).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error: HttpErrorResponse) => {
        const errors = Object.entries(error.error.errors)
          .map((entries) => entries.join(' '))
          .join(',');
        this.errorMesages = errors;
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
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
