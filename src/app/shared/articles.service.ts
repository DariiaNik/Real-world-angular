import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get('https://api.realworld.io/api/articles').pipe(
      map((response: any) => {
        return response.articles;
      })
    );
  }

  getBySlug(slug: string): Observable<Article> {
    return this.http.get(`https://api.realworld.io/api/articles/${slug}`).pipe(
      map((response: any) => {
        console.log(response.article);
        return response.article;
      })
    );
  }
}
