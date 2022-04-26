import { ArticlesService } from '../../shared/services/articles.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { Tags } from 'src/app/shared/models/tags-interface';
import { TagsService } from 'src/app/home-page/tags.service';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  user!: User;
  subscriptions: Subscription[] = [];

  constructor(
    private articlesService: ArticlesService,
    private tagsService: TagsService,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllArticles();
    this.getTags();

    if (this.authorizationService.isAuthenticated()) {
      this.getUser();
    }
  }

  private getAllArticles() {
    this.articles$ = this.articlesService.articles$;
    const getAllArticlesSubscription: Subscription = this.articlesService.getAll().subscribe();
    this.subscriptions.push(getAllArticlesSubscription);
  }

  private getTags() {
    this.tags$ = this.tagsService.getTags();
  }

  private getUser() {
    const userSubscription: Subscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.subscriptions.push(userSubscription);
  }

  public getArticles(type: string) {
    if (this.authorizationService.isAuthenticated()) {
      switch (type) {
        case 'global':
          this.getAllArticles();
          break;

        case 'your':
          this.articles$ = this.articlesService.getByAuthor(this.user.username);
          break;
      }
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
