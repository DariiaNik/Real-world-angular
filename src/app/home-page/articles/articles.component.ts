import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, Subject, Subscription } from 'rxjs';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { Article } from 'src/app/shared/models/article-interface';
import { Tags } from 'src/app/shared/models/tags-interface';
import { User } from 'src/app/shared/models/user-interface';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  @Input() type$!: Subject<string>;
  @Input() tagName$!: Subject<string>;
  @ViewChild('paginator') paginator!: MatPaginator;
  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  subscriptions: Subscription[] = [];
  pageEvent!: PageEvent;
  user!: User;
  length: number = 0;
  pageSize: number = 5;
  type!: string;
  loadingArticle: boolean = false;

  constructor(
    readonly articlesService: ArticlesService,
    readonly authorizationService: AuthorizationService,
    readonly userService: UserService
  ) {}

  ngOnInit(): void {
    this.getType();
    this.getTagName();
    this.getAllArticles(this.pageSize);

    if (this.authorizationService.isAuthenticated()) {
      this.getUser();
    }
  }

  private getUser() {
    const getUserSubscription: Subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.subscriptions.push(getUserSubscription);
  }

  private getTagName() {
    const getTagNameSubscription: Subscription = this.tagName$.subscribe((tag) => {
      if (tag) {
        this.getArticlesByTag(tag, this.pageSize);
      }
    });
    this.subscriptions.push(getTagNameSubscription);
  }

  private getType() {
    const getTypeSubscription: Subscription = this.type$.subscribe((value) => {
      this.type = value;
      this.paginator.firstPage();
      switch (this.type) {
        case 'global':
          this.getAllArticles(this.pageSize);
          break;

        case 'your':
          this.getFeedArticles(this.pageSize);
          break;
      }
    });
    this.subscriptions.push(getTypeSubscription);
  }

  public getAllArticles(limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.articles$;
    const getAllArticlesSubscription: Subscription = this.articlesService
      .getAll(limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
        this.loadingArticle = false;
      });
    this.subscriptions.push(getAllArticlesSubscription);
  }

  public getFeedArticles(limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.feedArticles$;
    const getFavoriteArticlesSubscription: Subscription = this.articlesService
      .getFeedArticles(limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
        this.loadingArticle = false;
      });
    this.subscriptions.push(getFavoriteArticlesSubscription);
  }

  public getArticlesByTag(tagName: string, limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.articlesByTag$;
    const getArticlesByTagSubscription: Subscription = this.articlesService
      .getByTag(tagName.toString(), limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
        this.loadingArticle = false;
      });
    this.subscriptions.push(getArticlesByTagSubscription);
  }

  public changesPage(event: PageEvent): PageEvent {
    this.loadingArticle = true;
    switch (this.type || 'global') {
      case 'global':
        this.getAllArticles(event.pageSize, event.pageIndex * event.pageSize);
        break;

      case 'your':
        this.getFeedArticles(event.pageSize, event.pageIndex * event.pageSize);
        break;
    }
    return event;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
