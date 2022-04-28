import { User } from '../models/user-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { ResponseUser } from 'src/app/shared/models/response-user-interface';
import { environment } from 'src/environments/environment';
import { AuthorizationService } from 'src/app/authorization/shared/services/authorization.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private authService: AuthorizationService) {}

  user$: Subject<User> = new Subject();

  getUser(): Observable<User> {
    return this.http.get<ResponseUser>(`${environment.apiUrl}user`).pipe(
      map((response: ResponseUser) => {
        this.user$.next(response.user);
        return response.user;
      })
    );
  }

  updateUser(user: User): Observable<any> {
    return this.http.put(`${environment.apiUrl}user`, { user }).pipe(
      map((response: any) => {
        this.authService.setToken(response);
        return response;
      })
    );
  }
}
