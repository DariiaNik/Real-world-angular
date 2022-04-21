import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable, pipe } from 'rxjs';
import { ProfileService } from 'src/app/profile/profile.service';
import { ArticlesService } from 'src/app/shared/articles.service';
import { Article } from 'src/app/shared/models/article-interface';
import { User } from 'src/app/shared/models/user-interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  articles$!: Observable<Article[]>;
  favouriteArticles$!: Observable<Article[]>;
  user!: User;
  name!: any;

  constructor(private profileService: ProfileService, private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.profileService.getUser().subscribe((user) => {
      this.user = user;
      this.articles$ = this.articlesService.getByAuthor(this.user.username);
    });
  }

  getArticles(type: string) {
    switch (type) {
      case 'author':
        this.articles$ = this.articlesService.getByAuthor(this.user.username);
        break;

      case 'favorites':
        this.articles$ = this.articlesService.getFavoriteArticles(this.user.username);
        break;
    }
  }
}
