import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { CommentsService } from 'src/app/article-page/comments.service';
import { ArticlesService } from 'src/app/shared/services/articles.service';
import { Article } from 'src/app/shared/models/article-interface';
import { Comments } from 'src/app/shared/models/comments-interface';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  article$!: Observable<Article>;
  comments$!: Observable<Comments[]>;
  user!: User;
  constructor(
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.article$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.articlesService.getBySlug(params['slug']);
      })
    );
    this.comments$ = this.route.params.pipe(
      switchMap((params: Params) => {
        return this.commentsService.getComments(params['slug']);
      })
    );
  }

  deleteArticle(slug: string) {
    this.articlesService.deleteArticle(slug).subscribe();
    this.router.navigate(['/home']);
  }
}
