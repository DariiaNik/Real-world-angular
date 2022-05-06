import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { Article } from 'src/app/shared/models/article-interface';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';
import { Profile } from 'src/app/shared/models/profile-interface';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  article$!: Observable<Article>;
  user!: User;
  profile!: Profile;
  disabled: boolean = false;

  constructor(
    readonly articlesService: ArticlesService,
    readonly userService: UserService,
    readonly profileService: ProfileService,
    readonly route: ActivatedRoute,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getArticles();
  }

  private getArticles() {
    this.article$ = this.articlesService.articleBySlug$;
    const getBySlugSubscription: Subscription = this.route.params
      .pipe(switchMap((params: Params) => this.articlesService.getBySlug(params['slug'])))
      .subscribe();
    this.subscriptions.push(getBySlugSubscription);
  }

  private getUser() {
    const getUserSubscription: Subscription = this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    });
    this.subscriptions.push(getUserSubscription);
  }

  public deleteArticle(slug: string) {
    const deleteSubscription: Subscription = this.articlesService.deleteArticle(slug).subscribe();
    this.subscriptions.push(deleteSubscription);
    this.router.navigate(['/home']);
  }

  public follow(username: string) {
    this.disabled = true;
    const followSubscription: Subscription = this.profileService.followUser(username).subscribe(() => {
      this.getArticles();
      this.disabled = false;
    });
    this.subscriptions.push(followSubscription);
  }

  public unFollow(username: string) {
    this.disabled = true;
    const unFollowSubscription: Subscription = this.profileService.unFollowUser(username).subscribe(() => {
      this.getArticles();
      this.disabled = false;
    });
    this.subscriptions.push(unFollowSubscription);
  }

  public favouriteArticle(slug: string) {
    this.disabled = true;
    const favouriteArticleSubscription: Subscription = this.articlesService.favouriteArticle(slug).subscribe(() => {
      this.getArticles();
      this.disabled = false;
    });
    this.subscriptions.push(favouriteArticleSubscription);
  }

  public unFavouriteArticle(slug: string) {
    this.disabled = true;
    const unFavouriteArticleSubscription: Subscription = this.articlesService.unFavouriteArticle(slug).subscribe(() => {
      this.getArticles();
      this.disabled = false;
    });
    this.subscriptions.push(unFavouriteArticleSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
