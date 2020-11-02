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
  user: Object;
  error;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(username, password) {
    this.authService.validate(username, password).subscribe(
      (response) => {
        this.authService.setUserInfo(response);
        this.user = response;
        console.log(response);
        this.authenticated = this.authService.isAuthenticated();

        this.router.navigate(['tasks']);
        //console.log("store", localStorage.getItem('userInfo'))
      },
      (err) => {
        this.error = err;
        console.log(err);
      }
    );
  }

  clear() {
    localStorage.clear();
    console.log(localStorage.getItem('userInfo'));
    this.authenticated = this.authService.isAuthenticated();
  }
}

//
