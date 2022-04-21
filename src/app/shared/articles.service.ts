import { ResponseArticle } from './models/response-article-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ResponseMultiArticles } from 'src/app/shared/models/response-multi-articles-interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<ResponseMultiArticles>('https://api.realworld.io/api/articles').pipe(
      map((response: ResponseMultiArticles) => {
        return response.articles;
      })
    );
  }

  getBySlug(slug: string): Observable<Article> {
    return this.http.get<ResponseArticle>(`https://api.realworld.io/api/articles/${slug}`).pipe(
      map((response: ResponseArticle) => {
        return response.article;
      })
    );
  }
  getByAuthor(author: string): Observable<Article[]> {
    return this.http.get<ResponseMultiArticles>(`http://api.realworld.io/api/articles?author=${author}`).pipe(
      map((response: ResponseMultiArticles) => {
        return response.articles;
      })
    );
  }
  getFavoriteArticles(username: string): Observable<Article[]> {
    return this.http.get<ResponseMultiArticles>(`http://api.realworld.io/api/articles?favorited=${username}`).pipe(
      map((response: ResponseMultiArticles) => {
        return response.articles;
      })
    );
  }
}
