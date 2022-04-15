import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { Tags } from 'src/app/shared/models/tags-interface';

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
    console.log('getBySlug');
    return this.http.get(`https://api.realworld.io/api/articles/${slug}`).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );
  }
  getTags(): Observable<Tags[]> {
    return this.http.get('https://api.realworld.io/api/tags').pipe(
      map((response: any) => {
        return response.tags;
      })
    );
  }
}