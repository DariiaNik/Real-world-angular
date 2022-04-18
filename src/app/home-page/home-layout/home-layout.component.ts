import { ArticlesService } from '../../shared/articles.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { Tags } from 'src/app/shared/models/tags-interface';
import { TagsService } from 'src/app/home-page/tags.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  constructor(
    private articlesService: ArticlesService,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
    this.articles$ = this.articlesService.getAll();
    this.tags$ = this.tagsService.getTags();
  }
}
