import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from 'src/app/home-page/home-layout/home-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagsComponent } from 'src/app/home-page/tags/tags.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ArticlesComponent } from './articles/articles.component';

@NgModule({
  declarations: [HomeLayoutComponent, TagsComponent, ArticlesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
      },
    ]),
  ],
})
export class HomePageModule {}
