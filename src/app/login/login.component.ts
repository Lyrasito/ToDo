import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  authenticated: Boolean;
  user: Object = this.authService.user;
  token: string;
  error;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(username, password) {
    this.authService.validate(username, password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        this.token = response.token;
        this.authenticated = this.authService.isAuthenticated(this.token);
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
}

//
