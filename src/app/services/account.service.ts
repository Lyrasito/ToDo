import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';
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
    return this.http.get(this.url + 'users');
  }

  public changePassword(userId, newPassword): Observable<any> {
    return this.http.patch(this.url + userId, {
      password: newPassword,
    });
  }

  public changeAdminStatus(userId, isAdmin): Observable<any> {
    return this.http
      .patch(this.url + userId, { isAdmin: !isAdmin })
      .pipe(
        catchError((val) => of('Cannot remove admin status from that user'))
      );
  }

  public registerUser(user): Observable<any> {
    return this.http
      .post(this.url + 'register', {
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
