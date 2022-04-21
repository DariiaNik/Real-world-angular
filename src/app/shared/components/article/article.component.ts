import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {}
}
