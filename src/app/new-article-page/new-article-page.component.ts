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

  private getArticleBySlug() {
    const getArticleBySlug: Subscription = this.route.params
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

    this.subscriptions.push(getArticleBySlug);
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

  private updateArticle(article: Article) {
    const updateArticle: Subscription = this.articlesService.updateArticle(article, this.article.slug).subscribe(() => {
      this.router.navigate(['/home']);
    });
    this.subscriptions.push(updateArticle);
  }

  private createArticle(article: Article) {
    const createArticle: Subscription = this.articlesService.createArticle(article).subscribe(() => {
      this.router.navigate(['/home']);
    });
    this.subscriptions.push(createArticle);
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
