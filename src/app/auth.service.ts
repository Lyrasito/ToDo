import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import  jwt_decode  from 'jwt-decode';

export interface User {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  user: Object;
  authentic: Boolean;
  

  public isAuthenticated(token): Boolean {
    //let userData = JSON.parse(localStorage.getItem('userInfo'));
    let userToken = localStorage.getItem('userToken');
    
    
    if (userToken === token) {
      this.authentic = true;
      return true;
    }
    this.authentic = false;
    return false;
    
    
  }

  public setToken(token) {
    //localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('userToken', token);
    const decoded = jwt_decode(token);
    this.user = decoded;
    console.log(decoded)
  }

  public validate(username: string, password: string) {
    return this.http
      .post(
        'http://localhost:3000/login',
        {
          username: username,
          password: password,
        },
        { responseType: 'json' }
      )
      .pipe(
        map((data: { token: string }) => {
          return data;
        })
      );
  }
  public authenticate() {
    let userToken = localStorage.getItem('userToken');
    return this.http.post('http://localhost:3000/authenticate', {}, {
      headers: {
        'authorization': 'Bearer ' + userToken
      }
    }).pipe(map((data: {authenticated: boolean}) => {
      return data;
    }))
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
