import { User } from '../models/user-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ResponseUser } from 'src/app/shared/models/response-user-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable<User> {
    return this.http.get<ResponseUser>(`${environment.apiUrl}user`).pipe(
      map((response: ResponseUser) => {
        return response.user;
      })
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}user`, { user }).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
