import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import jwt_decode from 'jwt-decode';
import { User } from '../user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidators } from './password.validators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  form: FormGroup;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,

    fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group(
      {
        oldPassword: [
          '',
          Validators.required,
          PasswordValidators.invalidPassword(this.authService),
        ],
        newPassword: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: PasswordValidators.passwordsShouldMatch }
    );
  }

  showErrors() {
    console.log(this.form.get('oldPassword'));
  }

  ngOnInit(): void {
    this.getUser();
  }

  get oldPassword() {
    return this.form.get('oldPassword');
  }
  get newPassword() {
    return this.form.get('newPassword');
  }
  get confirmPassword() {
    return this.form.get('confirmPassword');
  }

  getUser() {
    const token = localStorage.getItem('userToken');
    this.user = jwt_decode(token);
    console.log(this.user);
  }
  changePassword(userId, newPassword) {
    console.log('auth service', userId);
    if (this.form.valid) {
      this.accountService
        .changePassword(userId, newPassword)
        .subscribe((response) => console.log(response));
      this.router.navigate(['tasks']);
    }
  }
}
