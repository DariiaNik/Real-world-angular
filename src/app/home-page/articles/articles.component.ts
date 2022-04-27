import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  subscriptions: Subscription[] = [];
  pageEvent!: PageEvent;
  user!: User;
  length: number = 0;
  pageSize: number = 5;
  type!: string;

  constructor(
    private articlesService: ArticlesService,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.type$.subscribe((value) => {
      this.type = value;
      switch (this.type) {
        case 'global':
          this.getAllArticles(this.pageSize);
          break;

        case 'your':
          this.getFavoriteArticles(this.pageSize);
          break;
      }
    });
    this.getAllArticles(this.pageSize);
    if (this.authorizationService.isAuthenticated()) {
      this.getUser();
    }
  }

  private getUser() {
    const userSubscription: Subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.subscriptions.push(userSubscription);
  }

  private getFavoriteArticles(limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.articles$;
    const getAllArticlesSubscription: Subscription = this.articlesService
      .getFavoriteArticles(this.user.username, limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
      });
    this.subscriptions.push(getAllArticlesSubscription);
  }

  private getAllArticles(limit: number = 5, ofset: number = 0) {
    this.articles$ = this.articlesService.articles$;
    const getAllArticlesSubscription: Subscription = this.articlesService
      .getAll(limit, ofset)
      .subscribe((response: any) => {
        this.length = response.articlesCount;
      });
    this.subscriptions.push(getAllArticlesSubscription);
  }

  public changesPage(event: PageEvent): PageEvent {
    switch (this.type || 'global') {
      case 'global':
        this.getAllArticles(event.pageSize, event.pageIndex * event.pageSize);
        break;

      case 'your':
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
