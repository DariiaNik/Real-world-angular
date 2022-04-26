import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-new-article-page',
  templateUrl: './new-article-page.component.html',
  styleUrls: ['./new-article-page.component.scss'],
})
export class NewArticlePageComponent implements OnInit {
  form!: FormGroup;
  article!: Article;
  isFormReady: boolean = false;

  constructor(private articlesService: ArticlesService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      body: new FormControl(''),
      tagList: new FormControl(''),
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.articlesService.getBySlug(params['slug']);
        })
      )
      .subscribe({
        next: (article: Article) => {
          this.article = article;
          this.updateForm();
        },
        error: (error: any) => {
          if (error.statusText == 'Not Found') {
            this.isFormReady = true;
            console.warn = () => {};
          }
        },
      });
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

  public publishArticle() {
    const article = {
      ...this.form.value,
      tagList: this.form.value.tagList.toString().split(','),
    };
    if (this.article) {
      this.articlesService.updateArticle(article, this.article.slug).subscribe();
    } else {
      this.articlesService.createArticle(article).subscribe();
    }

    this.router.navigate(['/home']);
  }
}
