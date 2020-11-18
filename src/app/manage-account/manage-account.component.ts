import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordValidators } from '../change-password/password.validators';
import { AccountService } from '../services/account.service';
import { AuthService } from '../services/auth.service';
import { User } from '../user';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css'],
})
export class ManageAccountComponent implements OnInit {
  user: User = this.authService.user;
  form: FormGroup;
  message: string;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    fb: FormBuilder,
    private router: Router
  ) {
    this.form = fb.group({
      name: [this.user.name, Validators.required],
      username: [this.user.username, Validators.required],
      email: [this.user.email, Validators.required],
      oldPassword: [
        '',
        Validators.required,
        PasswordValidators.invalidPassword(this.authService),
      ],
    });
  }

  ngOnInit(): void {
    console.log(typeof this.user.name);
  }
  get email() {
    return this.form.get('email');
  }
  get name() {
    return this.form.get('name');
  }
  get username() {
    return this.form.get('username');
  }
  get oldPassword() {
    return this.form.get('oldPassword');
  }

  editDetails(userId, user) {
    /*
    this.user.name = this.name.value;
    this.user.username = this.username.value;
    this.user.email = this.email.value;
    this.user.password = this.oldPassword.value;
*/
    this.accountService.editDetails(userId, user).subscribe(
      (response) => {
        this.message = 'Account details successfully updated';
        console.log('what happened', this.user.password);
      },
      (error) => (this.message = 'Sorry, there was a problem.')
    );
  }

  showErrors() {
    console.log(this.form.get('oldPassword'));
  }
}
