import { User } from './../shared/models/user-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseUser } from 'src/app/shared/models/response-user-interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<ResponseUser>('https://api.realworld.io/api/user').pipe(
      map((response: ResponseUser) => {
        return response.user;
      })
    );
  }
}
