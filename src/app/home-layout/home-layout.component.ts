import { ArticlesService } from './../shared/articles.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article, Tags } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articles$ = this.articlesService.getAll();
    this.tags$ = this.articlesService.getTags();
  }
}
