import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticated: Boolean;
  user: Object;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(username, password) {

    this.authService.validate(username, password).subscribe(response => { 
     
      this.authService.setUserInfo(response);
      this.user = response;
      
      this.authenticated = this.authService.isAuthenticated();
      //console.log("store", localStorage.getItem('userInfo'))
     })
       
  }
  clear() {
    localStorage.clear();
    console.log(localStorage.getItem('userInfo'))
    this.authenticated = this.authService.isAuthenticated();
    
  }
}

//