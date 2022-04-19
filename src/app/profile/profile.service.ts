import { User } from './../shared/models/user-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<User>('https://api.realworld.io/api/user').pipe(
      map((response) => {
        console.log(response);
        return response;
      })
    );
  }
}
