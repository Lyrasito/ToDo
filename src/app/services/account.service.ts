import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ValidatorFn } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public changePassword(userId, newPassword): Observable<any> {
    return this.http.patch(`http://localhost:3000/${userId}`, {
      password: newPassword,
    });
  }
}
