import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { LoginUser } from 'src/app/shared/models/login-user-interface';
import { NewUser } from 'src/app/shared/models/new-user-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private http: HttpClient) {}

  public isAuthenticated$: Subject<boolean> = new Subject<boolean>();

  get token(): string {
    return localStorage.getItem('token')!;
  }

  login(user: LoginUser): Observable<LoginUser> {
    return this.http.post<LoginUser>(`${environment.apiUrl}users/login`, { user }).pipe(
      map((response) => {
        this.setToken(response);
        return response;
      })
    );
  }

  register(user: NewUser): Observable<NewUser> {
    return this.http.post<NewUser>(`${environment.apiUrl}users`, { user }).pipe(
      map((response) => {
        this.setToken(response);
        return response;
      })
    );
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    this.isAuthenticated$.next(!!this.token);
    return !!this.token;
  }

  setToken(response: any) {
    if (response) {
      localStorage.setItem('token', response.user.token);
    } else {
      localStorage.clear();
    }
  }
}
