import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticated;
  user: Object = this.authService.user;
  token: string;
  error: Object;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(localStorage.getItem('userToken'), localStorage.getItem('refreshToken'))
  }

  login(username, password) {
    this.authService.validate(username, password).subscribe(
      (response) => {
        this.authService.setToken(response.accessToken, response.refreshToken);
        this.authService.isAuthenticated(response.accessToken);
        this.authenticated = this.authService.authentic
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
    this.authenticated = this.authService.authentic;
  }

  refresh() {
    this.authService.refresh();
  }
}

//
