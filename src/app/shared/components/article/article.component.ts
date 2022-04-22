import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  @Input() article!: Article;

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {}

  favouriteArticle() {
    if (this.article.favorited) {
      this.articlesService.unFavouriteArticle(this.article.slug).subscribe();
    } else {
      this.articlesService.favouriteArticle(this.article.slug).subscribe();
    }
  }
}
