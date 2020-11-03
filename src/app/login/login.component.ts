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

  ngOnInit(): void {}

  login(username, password) {
    this.authService.validate(username, password).subscribe(
      (response) => {
        this.authService.setToken(response.token);
        //this.token = response.token;
        this.authService.isAuthenticated(response.token);
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
}

//
