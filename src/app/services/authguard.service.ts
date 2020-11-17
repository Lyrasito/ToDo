import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService implements CanActivate {
  constructor(private authService: AuthService, private route: Router) {}

  canActivate(): Promise<boolean> {
    // check if the user is authenticated
    // if not, return false and navigate to login

    return new Promise((resolve, reject) => {
      this.authService.isAuthenticated().then((isAuthenticated) => {
        //console.log('isAuthenticated', isAuthenticated);
        if (isAuthenticated) {
          this.authService.getUser(localStorage.getItem('userToken'));
          resolve(true);
        } else {
          this.route.navigate(['login']);
          resolve(false);
        }
      });

      /*if (this.authService.authentic) {
        resolve(true);
      }
      this.route.navigate(['login']);
      resolve(false);*/
    });
  }
}
