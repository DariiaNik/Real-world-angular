import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tags } from 'src/app/shared/models/tags-interface';

@Injectable({
  providedIn: 'root',
})
export class TagsService {
  constructor(private http: HttpClient) {}

  getTags(): Observable<Tags[]> {
    return this.http.get('https://api.realworld.io/api/tags').pipe(
      map((response: any) => {
        return response.tags;
      })
    );
  }
}
