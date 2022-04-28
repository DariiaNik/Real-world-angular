import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { ArticleComponent } from 'src/app/shared/components/article/article.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [ArticleComponent],
  imports: [MatButtonModule, MatIconModule, HttpClientModule, RouterModule, CommonModule],
  exports: [MatButtonModule, MatIconModule, HttpClientModule, ArticleComponent],
})
export class SharedModule {}
