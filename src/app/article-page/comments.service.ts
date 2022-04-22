import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Comments } from 'src/app/shared/models/comments-interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  getComments(slug: string): Observable<Comments[]> {
    return this.http.get(`https://api.realworld.io/api/articles/${slug}/comments`).pipe(
      map((response: any) => {
        return response.comments;
      })
    );
  }
}
