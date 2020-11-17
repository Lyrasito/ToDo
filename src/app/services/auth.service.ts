import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { User } from '../user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public user: User;
  authentic: Boolean;

  // user accesses (API)or Route
  // if access token is not expired, allow
  // if access token is expired
  // refresh access token
  // allow

  // if refresh token is expired, login

  public isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!this.isAccessTokenExpired()) {
        resolve(true);
        return;
      }

      if (this.isRefreshTokenExpired()) {
        resolve(false);
        return;
      }

      // refresh the access token
      this.refreshAccessToken().then((response) => {
        this.setToken(response.accessToken, response.refreshToken);
        resolve(true);
        return;
      });
    });
  }

  private isAccessTokenExpired(): boolean {
    try {
      let userToken = localStorage.getItem('userToken');
      const decoded = jwt_decode(userToken);
      const expiryDate = decoded.exp;
      let date = new Date();
      const currentDate = Math.floor(date.getTime() / 1000);

      return expiryDate <= currentDate;
    } catch (e) {
      // jwt_decode error, invalid token to decode
      return true;
    }
  }

  private isRefreshTokenExpired(): boolean {
    try {
      let refreshToken = localStorage.getItem('refreshToken');
      const decoded = jwt_decode(refreshToken);
      const expiryDate = decoded.exp;
      let date = new Date();
      const currentDate = Math.floor(date.getTime() / 1000);

      return expiryDate <= currentDate;
    } catch (e) {
      // jwt_decode error, invalid token to decode
      return true;
    }
  }

  private refreshAccessToken(): Promise<any> {
    console.log('refreshing access token');
    return this.http
      .post<any>(`http://localhost:3000/refresh-token`, {
        refreshToken: this.getRefreshToken(),
      })
      .toPromise();
  }

  public setToken(accessToken, refreshToken) {
    localStorage.setItem('userToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    const decoded = jwt_decode(accessToken);
    this.user = decoded;
    console.log(this.user);
  }

  public getUser(accessToken) {
    const decoded = jwt_decode(accessToken);
    this.user = decoded;
  }

  public getToken() {
    return localStorage.getItem('userToken');
  }

  getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  public isAdmin() {
    const accessToken = localStorage.getItem('userToken');
    const decoded = jwt_decode(accessToken);
    return decoded.isAdmin;
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
        map((data: { accessToken: string; refreshToken: string }) => {
          return data;
        })
      );
  }
  public authenticate() {
    let userToken = localStorage.getItem('userToken');
    return this.http
      .post(
        'http://localhost:3000/authenticate',
        {},
        {
          headers: {
            authorization: 'Bearer ' + userToken,
          },
        }
      )
      .pipe(
        map((data: { authenticated: boolean }) => {
          return data;
        })
      );
  }

  public comparePasswords(password, id) {
    return this.http.post(`http://localhost:3000/${id}/comparePasswords`, {
      password,
    });
  }
}
