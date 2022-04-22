import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseComment } from 'src/app/shared/models/response-comment-interface';
import { Comment } from 'src/app/shared/models/comment-interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(slug: string): Observable<ResponseComment[]> {
    return this.http.get(`https://api.realworld.io/api/articles/${slug}/comments`).pipe(
      map((response: any) => {
        return response.comments;
      })
    );
  }
  addComments(slug: string, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`https://api.realworld.io/api/articles/${slug}/comments`, { comment }).pipe(
      map((response) => {
        return response;
      })
    );
  }
  deleteComment(slug: string, id: number) {
    return this.http.delete(`https://api.realworld.io/api/articles/${slug}/comments/${id}`).pipe(
      map((response) => {
        return response;
      })
    );
  }
}
