import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'to-do';
  ngOnInit() {
    const userToken = localStorage.getItem('userToken')
    this.authService.isAuthenticated(userToken);
  }
  constructor(private authService: AuthService) {

  }
}
