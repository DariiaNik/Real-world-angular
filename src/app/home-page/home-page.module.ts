import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from 'src/app/home-page/home-layout/home-layout.component';
import { ArticleComponent } from 'src/app/home-page/article/article.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagsComponent } from 'src/app/home-page/tags/tags.component';

@NgModule({
  declarations: [HomeLayoutComponent, ArticleComponent, TagsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
      },
    ]),
  ],
})
export class HomePageModule {}
