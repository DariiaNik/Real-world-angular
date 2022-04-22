import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HomeLayoutComponent } from 'src/app/home-page/home-layout/home-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TagsComponent } from 'src/app/home-page/tags/tags.component';

@NgModule({
  declarations: [HomeLayoutComponent, TagsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeLayoutComponent,
        children: [
          {
            path: 'your',
            component: HomeLayoutComponent,
          },
        ],
      },
    ]),
  ],
})
export class HomePageModule {}
