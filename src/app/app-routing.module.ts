import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./authorization/authorization.module').then((m) => m.AuthorizationModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'article/:slug',
    loadChildren: () => import('./article-page/article-page.module').then((m) => m.ArticlePageModule),
  },
  {
    path: 'editor',
    loadChildren: () => import('./new-article-page/new-article-page.module').then((m) => m.NewArticlePageModule),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
