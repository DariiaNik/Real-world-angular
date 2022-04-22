import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ResponseComment } from 'src/app/shared/models/response-comment-interface';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';
import { CommentsService } from 'src/app/article-page/comments.service';
import { Comment } from 'src/app/shared/models/comment-interface';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit {
  @Input() slug!: string;
  form!: FormGroup;
  comments$!: Observable<ResponseComment[]>;
  user!: User;

  constructor(private userService: UserService, private commentsService: CommentsService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.user = user;
    });
    this.getComments();
    this.form = new FormGroup({
      comment: new FormControl(''),
    });
  }

  private getComments() {
    this.comments$ = this.commentsService.getComments(this.slug);
  }
  public deleteComment(id: number) {
    this.commentsService.deleteComment(this.slug, id).subscribe();
  }

  public postComment() {
    const comment: Comment = {
      body: this.form.value.comment,
    };
    this.commentsService.addComments(this.slug, comment).subscribe();
  }
}
