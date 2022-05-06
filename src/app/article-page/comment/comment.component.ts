import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user-interface';
import { UserService } from 'src/app/shared/services/user.service';
import { CommentsService } from 'src/app/article-page/comment/comments.service';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NewComment } from 'src/app/shared/models/new-comment-interface';
import { SingleComment } from 'src/app/shared/models/comment-interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent implements OnInit, OnDestroy {
  @Input() slug!: string;
  comments$!: Observable<SingleComment[]>;
  subscriptions: Subscription[] = [];
  form!: FormGroup;
  user!: User;
  disabled: boolean = false;

  constructor(readonly userService: UserService, readonly commentsService: CommentsService) {}

  ngOnInit(): void {
    this.getUser();
    this.getComments();
    this.form = new FormGroup({
      comment: new FormControl('', [Validators.required]),
    });
  }

  private getUser() {
    const getUserSubscription: Subscription = this.userService.getUser().subscribe((user: User) => {
      this.user = user;
    });
    this.subscriptions.push(getUserSubscription);
  }

  private getComments() {
    this.comments$ = this.commentsService.comments$;
    const getCommentsSubscription: Subscription = this.commentsService.getComments(this.slug).subscribe();
    this.subscriptions.push(getCommentsSubscription);
  }

  public deleteComment(id: number) {
    const deleteSubscription: Subscription = this.commentsService.deleteComment(this.slug, id).subscribe(() => {
      this.getComments();
    });
    this.subscriptions.push(deleteSubscription);
  }

  public postComment() {
    this.disabled = true;
    const comment: NewComment = {
      body: this.form.value.comment,
    };
    const profileSubscription: Subscription = this.commentsService.addComments(this.slug, comment).subscribe(() => {
      this.getComments();
      this.form.reset();
      this.disabled = false;
    });
    this.subscriptions.push(profileSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub: Subscription) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
