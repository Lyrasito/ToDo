import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  url: string = 'http://localhost:3000/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  public getUsers(): Observable<any> {
    return this.http.get<User[]>(this.url + 'users');
  }

  public editDetails(userId: string, user: User): Observable<User> {
    return this.http.patch<User>(this.url + userId, user);
  }

  public changePassword(userId: string, newPassword: string): Observable<User> {
    return this.http.patch<User>(this.url + userId, {
      password: newPassword,
    });
  }

  public changeAdminStatus(userId: string, isAdmin: boolean): Observable<any> {
    return this.http
      .patch<User>(this.url + userId, { isAdmin: !isAdmin })
      .pipe(
        catchError((val) => of('Cannot remove admin status from that user'))
      );
  }

  public registerUser(user: User): Observable<any> {
    return this.http
      .post<User>(this.url + 'register', {
        name: user.name,
        username: user.username,
        email: user.email,
        password: user.password,
        isAdmin: user.isAdmin,
      })
      .pipe(
        map((data: { id; name; username; email; password; isAdmin }) => {
          return data;
        })
      );
  }
}
