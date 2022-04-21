import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-new-article-page',
  templateUrl: './new-article-page.component.html',
  styleUrls: ['./new-article-page.component.scss'],
})
export class NewArticlePageComponent implements OnInit {
  form!: FormGroup;
  constructor(private articlesService: ArticlesService, private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      body: new FormControl(''),
      tagList: new FormControl(''),
    });
  }

  publishArticle() {
    const article = {
      ...this.form.value,
      tagList: this.form.value.tagList.split(','),
    };
    this.articlesService.createArticle(article).subscribe((response) => {
      console.log(response);
    });
    this.router.navigate(['/home']);
  }
}
