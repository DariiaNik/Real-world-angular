import { Component, Input, OnInit } from '@angular/core';
import { Comments } from 'src/app/shared/models/comments-interface';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comments;

  constructor() {}

  ngOnInit(): void {}
}
