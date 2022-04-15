import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/shared/interfaces';
import { ArticlesService } from '../../articles.service';

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
