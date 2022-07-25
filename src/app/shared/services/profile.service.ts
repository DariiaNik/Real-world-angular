import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(username: string) {
    return this.http.get(`${environment.apiUrl}profiles/${username}`).pipe(map((response: any) => response));
  }

  followUser(username: string) {
    return this.http
      .post(`${environment.apiUrl}profiles/${username}/follow`, {})
      .pipe(map((response: any) => response));
  }

  unFollowUser(username: string) {
    return this.http
      .delete(`${environment.apiUrl}profiles/${username}/follow`)
      .pipe(map((response: any) => response));
  }
}
