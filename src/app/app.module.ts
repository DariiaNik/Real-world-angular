import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { HomeLayoutComponent } from './home-layout/home-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleComponent } from './shared/components/article/article.component';
import { TagsComponent } from './shared/components/tags/tags.component';
import { ArticlePageComponent } from './article-page/article-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeLayoutComponent,
    NavbarComponent,
    ArticleComponent,
    TagsComponent,
    ArticlePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
