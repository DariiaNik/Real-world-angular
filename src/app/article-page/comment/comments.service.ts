import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { NewComment } from 'src/app/shared/models/new-comment-interface';
import { ResponseMultiComment } from 'src/app/shared/models/response-multi-comment-interface';
import { SingleComment } from 'src/app/shared/models/comment-interface';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient) {}

  public comments$: BehaviorSubject<SingleComment[]> = new BehaviorSubject<SingleComment[]>([]);

  getComments(slug: string): Observable<SingleComment[]> {
    return this.http.get<ResponseMultiComment>(`${environment.apiUrl}articles/${slug}/comments`).pipe(
      map((response: ResponseMultiComment) => {
        this.comments$.next(response.comments);
        return response.comments;
      }),
    );
  }


  addComments(slug: string, comment: NewComment): Observable<NewComment> {
    return this.http.post<NewComment>(`${environment.apiUrl}articles/${slug}/comments`, { comment }).pipe(
      map((response: NewComment) => response),
    );
  }

  deleteComment(slug: string, id: number) {
    return this.http.delete(`${environment.apiUrl}articles/${slug}/comments/${id}`).pipe();
  }
}
