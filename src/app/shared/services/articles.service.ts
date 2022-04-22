import { ResponseArticle } from '../models/response-article-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { Article } from 'src/app/shared/models/article-interface';
import { ResponseMultiArticles } from 'src/app/shared/models/response-multi-articles-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Article[]> {
    return this.http.get<ResponseMultiArticles>(`${environment.apiUrl}articles`).pipe(
      map((response: ResponseMultiArticles) => {
        return response.articles;
      })
    );
  }

  getBySlug(slug: string): Observable<Article> {
    return this.http.get<ResponseArticle>(`${environment.apiUrl}articles/${slug}`).pipe(
      map((response: ResponseArticle) => {
        return response.article;
      })
    );
  }
  getByAuthor(author: string): Observable<Article[]> {
    return this.http.get<ResponseMultiArticles>(`${environment.apiUrl}articles?author=${author}`).pipe(
      map((response: ResponseMultiArticles) => {
        return response.articles;
      })
    );
  }
  getFavoriteArticles(username: string): Observable<Article[]> {
    return this.http.get<ResponseMultiArticles>(`${environment.apiUrl}articles?favorited=${username}`).pipe(
      map((response: ResponseMultiArticles) => {
        return response.articles;
      })
    );
  }
  createArticle(article: Article): Observable<any> {
    return this.http.post(`${environment.apiUrl}articles`, { article }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  updateArticle(article: Article, slug: string) {
    return this.http.put(`${environment.apiUrl}articles/${slug}`, { article });
  }

  deleteArticle(slug: string) {
    return this.http.delete(`${environment.apiUrl}articles/${slug}`);
  }
  favouriteArticle(slug: string) {
    return this.http.post(`${environment.apiUrl}articles/${slug}/favorite`, {});
  }

  unFavouriteArticle(slug: string) {
    return this.http.delete(`${environment.apiUrl}articles/${slug}/favorite`);
  }
}
