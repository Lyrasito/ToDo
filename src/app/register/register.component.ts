import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private accountService: AccountService) {}
  user: User;
  isAdmin: boolean;
  error;

  ngOnInit(): void {}

  register(user) {
    console.log('here');
    this.accountService.registerUser(user).subscribe(
      (response) => {
        //console.log(response);
        this.user = response.user;
        this.error = null;
      },
      (error) => (this.error = error)
    );
  }
  checkAdmin(value: boolean) {
    this.isAdmin = value;
  }
}
