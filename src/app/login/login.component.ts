import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  user: Object = this.authService.user;
  token: string;
  error: Object;

  constructor(private authService: AuthService, private router: Router) {}

  login(username, password) {
    this.authService.validate(username, password).subscribe(
      (response) => {
        const decoded = jwt_decode(response.accessToken);
        console.log(decoded);
        if (!decoded.lastLogin) {
          this.router.navigate(['change-password']);
          this.authService.setToken(
            response.accessToken,
            response.refreshToken
          );
          return;
        }
        this.authService.setToken(response.accessToken, response.refreshToken);
        this.router.navigate(['tasks']);
      },
      (err) => {
        this.error = err;
        console.log(err);
      }
    );
  }

  clear() {
    localStorage.clear();
  }
}
