import { Component, Input, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
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
  @Input() article!: Article;
  disabled: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {}

  private getAllArticle() {
    const getAllArticlesSubscription = this.articlesService.getAll().subscribe(() => {
      this.disabled = false;
    });
    this.subscriptions.push(getAllArticlesSubscription);
  }

  private favouriteArticle() {
    this.disabled = true;
    const favouriteArticleSubscription = this.articlesService.favouriteArticle(this.article.slug).subscribe(() => {
      this.getAllArticle();
    });
    this.subscriptions.push(favouriteArticleSubscription);
  }
  private unFavouriteArticle() {
    this.disabled = true;
    const unFavouriteArticleSubscription = this.articlesService.unFavouriteArticle(this.article.slug).subscribe(() => {
      this.getAllArticle();
    });
    this.subscriptions.push(unFavouriteArticleSubscription);
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
