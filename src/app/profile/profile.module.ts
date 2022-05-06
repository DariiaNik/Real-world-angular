import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ProfileArticlesComponent } from 'src/app/profile/profile-articles/profile-articles.component';
import { ProfileComponent } from './profile.component';

@NgModule({
  declarations: [ProfileComponent, ProfileArticlesComponent],
  imports: [
    CommonModule,
    SharedModule,
    MatPaginatorModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
      },
    ]),
  ],
})
export class ProfileModule {}
