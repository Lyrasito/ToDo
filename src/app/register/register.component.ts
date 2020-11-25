import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { User } from '../user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private accountService: AccountService, private fb: FormBuilder) {
    this.form = fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  user: User;
  isAdmin: boolean;
  error;
  form: FormGroup;
  isAdminError: string;

  ngOnInit(): void {}

  get name() {
    return this.form.get('name');
  }
  get username() {
    return this.form.get('username');
  }
  get email() {
    return this.form.get('email');
  }
  get password() {
    return this.form.get('password');
  }
  register(user) {
    if (!this.isAdmin) {
      this.isAdminError = 'Please select the admin status of the user.';
      return;
    }
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
    this.isAdminError = null;
  }
}
