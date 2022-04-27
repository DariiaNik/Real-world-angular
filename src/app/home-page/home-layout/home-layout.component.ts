import { Component, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { Tags } from 'src/app/shared/models/tags-interface';
import { TagsService } from 'src/app/home-page/tags.service';
import { User } from 'src/app/shared/models/user-interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit {
  articles$!: Observable<Article[]>;
  tags$!: Observable<Tags[]>;
  subscriptions: Subscription[] = [];
  changingValue$: Subject<string> = new Subject();
  tagName$: Subject<string> = new Subject();
  type: string = 'global';
  user!: User;
  length: number = 0;
  pageSize: number = 5;
  pageEvent!: PageEvent;
  selectedItem!: any;

  constructor(private tagsService: TagsService) {}

  ngOnInit(): void {
    this.getTags();
    this.changingValue$.subscribe((value) => {
      if (value) {
        this.type = value;
      }
    });
  }

  private getTags() {
    this.tags$ = this.tagsService.getTags();
  }

  public getType(type: string) {
    this.changingValue$.next(type);
  }

  public getTagName($event: Event) {
    this.tagName$.next($event.toString());
    this.getType($event.toString());
  }

  public clearTag() {
    this.tagName$.next('');
  }
}
