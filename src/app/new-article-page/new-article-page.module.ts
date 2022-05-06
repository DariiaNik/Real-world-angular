import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationGuard } from 'src/app/authorization/shared/services/authorization.guard';
import { NewArticlePageComponent } from './new-article-page.component';

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
        canActivate: [AuthorizationGuard],
      },
      {
        path: ':slug',
        component: NewArticlePageComponent,
        canActivate: [AuthorizationGuard],
      },
    ]),
  ],
})
export class NewArticlePageModule {}
