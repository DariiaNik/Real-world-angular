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
  constructor(
    private articlesService: ArticlesService,
    private tagsService: TagsService,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {}

  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  user!: User;
  uSub!: Subscription;

  ngOnInit(): void {
    this.articles$ = this.articlesService.getAll();
    this.tags$ = this.tagsService.getTags();

    if (this.authorizationService.isAuthenticated()) {
      this.uSub = this.userService.getUser().subscribe((user) => {
        this.user = user;
      });
    }
  }

  getArticles(type: string) {
    if (this.authorizationService.isAuthenticated()) {
      switch (type) {
        case 'global':
          this.articles$ = this.articlesService.getAll();
          break;

        case 'your':
          this.articles$ = this.articlesService.getByAuthor(this.user.username);
          break;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.uSub) {
      this.uSub.unsubscribe();
    }
  }
}
