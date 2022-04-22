import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewArticlePageComponent } from './new-article-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewArticlePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: NewArticlePageComponent,
      },
      {
        path: ':slug',
        component: NewArticlePageComponent,
      },
    ]),
  ],
})
export class NewArticlePageModule {}
