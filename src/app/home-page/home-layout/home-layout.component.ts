import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { Tags } from 'src/app/shared/models/tags-interface';
import { TagsService } from 'src/app/home-page/tags.service';
import { User } from 'src/app/shared/models/user-interface';
import { PageEvent } from '@angular/material/paginator';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.scss'],
})
export class HomeLayoutComponent implements OnInit, OnDestroy {
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
  isAuth!: boolean;

  constructor(private tagsService: TagsService, private authorizationService: AuthorizationService) {}

  ngOnInit(): void {
    this.getTags();
    this.changingValue();
    this.isAuth = this.authorizationService.isAuthenticated();
  }

  private changingValue() {
    const changingValue: Subscription = this.changingValue$.subscribe((value) => {
      if (value) {
        this.type = value;
      }
    });
    this.subscriptions.push(changingValue);
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

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      if (sub) {
        sub.unsubscribe();
      }
    });
  }
}
