import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Article } from 'src/app/shared/models/article-interface';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
