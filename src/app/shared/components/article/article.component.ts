import { Component, Input, OnInit, ChangeDetectionStrategy, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit, OnDestroy {
  @Output('getAllArticles') getAllArticles: EventEmitter<void> = new EventEmitter();
  @Output('getFavoriteArticles') getFavoriteArticles: EventEmitter<void> = new EventEmitter();
  @Output('getFavoriteArticlesProfile') getFavoriteArticlesProfile: EventEmitter<void> = new EventEmitter();
  @Output('getArticlesByTag') getArticlesByTag: EventEmitter<String> = new EventEmitter();
  @Output('getArticlesByAuthor') getArticlesByAuthor: EventEmitter<void> = new EventEmitter();
  @Input() article!: Article;
  @Input() type!: string;
  disabled: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {}

  private favouriteArticle() {
    this.disabled = true;
    const favouriteArticleSubscription: Subscription = this.articlesService
      .favouriteArticle(this.article.slug)
      .subscribe(() => {
        this.updateArticles();
      });
    this.subscriptions.push(favouriteArticleSubscription);
  }
  private unFavouriteArticle() {
    this.disabled = true;
    const unFavouriteArticleSubscription: Subscription = this.articlesService
      .unFavouriteArticle(this.article.slug)
      .subscribe(() => {
        this.updateArticles();
      });
    this.subscriptions.push(unFavouriteArticleSubscription);
  }

  private updateArticles() {
    if (this.type) {
      switch (this.type) {
        case 'global':
          this.getAllArticles.emit();
          break;

        case 'your':
          this.getFavoriteArticles.emit();
          break;

        case 'favorites':
          this.getFavoriteArticlesProfile.emit();
          break;

        case 'author':
          this.getArticlesByAuthor.emit();
          break;

        default:
          this.getArticlesByTag.emit(this.type);
      }
    } else {
      this.getAllArticles.emit();
      this.getArticlesByAuthor.emit();
    }
  }

  public favouriteClick() {
    if (this.article.favorited) {
      this.unFavouriteArticle();
    } else {
      this.favouriteArticle();
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
