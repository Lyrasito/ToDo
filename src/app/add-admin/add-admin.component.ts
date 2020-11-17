import { Component, OnInit } from '@angular/core';
import { AccountService } from '../services/account.service';
import { User } from '../user';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css'],
})
export class AddAdminComponent implements OnInit {
  users;
  errorMessage: string;
  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.getUsers().subscribe((response) => {
      console.log(response);
      this.users = response.users;
    });
  }

  changeAdminStatus(id, isAdmin) {
    const index = this.users.findIndex((user) => user._id === id);
    this.accountService.changeAdminStatus(id, isAdmin).subscribe((response) => {
      console.log(response);
      if (response.user) {
        this.users[index] = response.user;
        console.log(this.users[index]);
        this.errorMessage = null;
        return;
      }
      this.errorMessage = response.error;
    });
  }
}
