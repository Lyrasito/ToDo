import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'to-do';
  ngOnInit() {
    const userToken = localStorage.getItem('userToken');
    this.authService.isAuthenticated();
  }
  constructor(private authService: AuthService) {}
}
