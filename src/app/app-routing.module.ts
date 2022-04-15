import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from 'src/app/article-page/article-page.component';
import { HomeLayoutComponent } from 'src/app/home-layout/home-layout.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeLayoutComponent,
  },
  {
    path: 'article/:slug',
    component: ArticlePageComponent,
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./authorization/authorization.module').then(
        (m) => m.AuthorizationModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
