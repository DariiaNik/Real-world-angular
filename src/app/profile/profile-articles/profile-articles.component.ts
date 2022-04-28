import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subject, Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';

@Component({
  selector: 'app-profile-articles',
  templateUrl: './profile-articles.component.html',
  styleUrls: ['./profile-articles.component.scss'],
})
export class ProfileArticlesComponent implements OnInit, OnDestroy {
  constructor(private articlesService: ArticlesService) {}
  @Input() username!: string;
  @Input() type$!: Subject<string>;
  articles$!: Observable<Article[]>;
  favouriteArticles$!: Observable<Article[]>;
  subscriptions: Subscription[] = [];
  pageEvent!: PageEvent;
  type!: string;
  name!: any;
  disabled: boolean = false;
  length: number = 0;
  pageSize: number = 5;

  ngOnInit(): void {
    this.type$.subscribe((value) => {
      this.type = value;
      switch (this.type) {
        case 'favorites':
          this.getFavoriteArticles(this.pageSize);
          break;

        case 'author':
          this.getArticlesByAuthor(this.pageSize);
          break;
      }
    });
    this.getArticlesByAuthor();
  }

  public getArticlesByAuthor(limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.articlesByAuthor$;
    const getAllArticlesSubscription: Subscription = this.articlesService
      .getByAuthor(this.username, limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
      });
    this.subscriptions.push(getAllArticlesSubscription);
  }

  public getFavoriteArticles(limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.favoriteArticles$;
    const getAllArticlesSubscription: Subscription = this.articlesService
      .getFavoriteArticles(this.username, limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
      });
    this.subscriptions.push(getAllArticlesSubscription);
  }

  public changesPage(event: PageEvent): PageEvent {
    switch (this.type || 'author') {
      case 'author':
        this.getArticlesByAuthor(event.pageSize, event.pageIndex * event.pageSize);
        break;

      case 'favorites':
        this.getFavoriteArticles(event.pageSize, event.pageIndex * event.pageSize);
        break;
    }
    return event;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
