import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  authentic: Boolean;

  public isAuthenticated(token): Boolean {
    let userData = JSON.parse(localStorage.getItem('userInfo'));
    let userToken = localStorage.getItem('userToken');

    if (userToken === token) {
      console.log('log', userData.name);
      this.authentic = true;
      return true;
    }
    this.authentic = false;
    return false;
  }

  public setUserInfo(user, token) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('userToken', token);
    // console.log(JSON.stringify(user))

    //console.log('here', user, localStorage.getItem('userInfo'));
  }

  public validate(username: string, password: string) {
    return this.http
      .post(
        'http://localhost:3000/authenticate',
        {
          username: username,
          password: password,
        },
        { responseType: 'json' }
      )
      .pipe(
        map((data: { user: Object; token: string }) => {
          return data;
        })
      );
  }
}

/* return this.httpClient.get(`https://reqres.in/api/users`).
        pipe(
           map((data: Users[]) => {
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        )
    }; */
