import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getProfile(username: string) {
    return this.http.get(`https://api.realworld.io/api/profiles/${username}`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  followUser(username: string) {
    return this.http.post(`https://api.realworld.io/api/profiles/${username}/follow`, {}).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
  unFollowUser(username: string) {
    return this.http.delete(`https://api.realworld.io/api/profiles/${username}/follow`).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
