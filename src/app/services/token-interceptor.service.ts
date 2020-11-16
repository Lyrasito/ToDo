import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) {}

  authService = this.injector.get(AuthService);

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.authService.getToken()) {
      request = this.addToken(request, this.authService.getToken());
    }

    // make request, if error call handle401Error
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401Error(request, next);
        } else {
          throw new Error(error);
        }
      })
    );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    // we think we have a valid token, but server says we dont
    // refresh token from server
    // try request again

    return from(this.authService.isAuthenticated()).pipe(
      switchMap((isAuthenticated) => {
        // add token to request
        request = this.addToken(request, this.authService.getToken());
        // make request
        return next.handle(request);
      })
    );
  }
}
