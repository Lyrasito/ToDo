import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
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
    
    
    if (userToken && userToken === token) {
      this.authentic = true;
      return true;
    }
    this.authentic = false;
    return false;
    
    
  }

  public setToken(accessToken, refreshToken) {
    //localStorage.setItem('userInfo', JSON.stringify(user));
    localStorage.setItem('userToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken)
    const decoded = jwt_decode(accessToken);
    this.user = decoded;
    //console.log(decoded)
  }

  public getToken() {
    return localStorage.getItem('userToken')
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
        map((data: { accessToken: string, refreshToken: string }) => {
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
  /*
  public refresh(refreshToken: string) {
    return this.http.post('http://localhost:3000/refresh-token', { refreshToken }).pipe(
      map((data: { accessToken: string, refreshToken: string }) => {
      return data;
      })
    )
  }
  */
 getRefreshToken() {
   return localStorage.getItem('refreshToken')
 }
  public refresh() {
    return this.http.post<any>(`http://localhost:3000/refresh-token`, {
      'refreshToken': this.getRefreshToken()
    }).pipe(tap((tokens) => {
      this.setToken(tokens.accessToken, tokens.refreshToken);
      //this.storeJwtToken(tokens.jwt);
    }));
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
