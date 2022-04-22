import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ArticlePageComponent } from 'src/app/article-page/article-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CommentComponent } from 'src/app/article-page/comment/comment.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticlePageComponent, CommentComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ArticlePageComponent,
      },
    ]),
  ],
})
export class ArticlePageModule {}
