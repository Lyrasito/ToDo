import { HttpClient } from '@angular/common/http';
import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';

export class PasswordValidators {
  static passwordsShouldMatch(control: AbstractControl) {
    let newPassword = control.get('newPassword');
    let confirmPassword = control.get('confirmPassword');
    if (newPassword.value !== confirmPassword.value) {
      return { passwordsShouldMatch: true };
    }
    return null;
  }

  static invalidPassword(authService: AuthService): AsyncValidatorFn {
    let decodedUser = authService.getTokenAndDecode();

    return (control: AbstractControl): Observable<ValidationErrors> => {
      return authService.comparePasswords(control.value, decodedUser.id).pipe(
        map((result) => {
          console.log(result);
          return result ? null : { invalidPassword: true };
        })
      );
    };
  }
}
