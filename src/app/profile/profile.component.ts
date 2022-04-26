import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { map, Observable, pipe, Subscription, switchMap } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { Article } from 'src/app/shared/models/article-interface';
import { User } from 'src/app/shared/models/user-interface';
import { Profile } from 'src/app/shared/models/profile-interface';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  articles$!: Observable<Article[]>;
  favouriteArticles$!: Observable<Article[]>;
  user!: User;
  profile!: Profile;
  name!: any;
  subscriptions: Subscription[] = [];
  disabled: boolean = false;

  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private profileService: ProfileService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getProfile();
  }

  private getUser() {
    const getUserSubscription = this.userService.getUser().subscribe((user) => {
      this.user = user;
    });

    this.subscriptions.push(getUserSubscription);
  }

  private getProfile() {
    const getProfileSubscription = this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.profileService.getProfile(params['username']);
        })
      )
      .subscribe((response) => {
        this.profile = response.profile;
        this.getArticlesByAuthor();
      });

    this.subscriptions.push(getProfileSubscription);
  }

  private getArticlesByAuthor() {
    this.articles$ = this.articlesService.getByAuthor(this.profile.username);
  }

  public getArticles(type: string) {
    switch (type) {
      case 'author':
        this.articles$ = this.articlesService.getByAuthor(this.profile.username);
        break;

      case 'favorites':
        this.articles$ = this.articlesService.getFavoriteArticles(this.profile.username);
        break;
    }
  }

  public following(username: string) {
    this.disabled = true;
    const followSubscription: Subscription = this.profileService.followUser(username).subscribe(() => {
      this.getProfile();
      this.disabled = false;
    });
    this.subscriptions.push(followSubscription);
  }

  public unFollowing(username: string) {
    this.disabled = true;
    const unFollowSubscription: Subscription = this.profileService.unFollowUser(username).subscribe(() => {
      this.getProfile();
      this.disabled = false;
    });
    this.subscriptions.push(unFollowSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
