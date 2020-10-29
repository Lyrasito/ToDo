import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError,  } from 'rxjs/operators';
import { Observable } from 'rxjs'

export interface User {
  id: number,
  name: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  

  public isAuthenticated() : Boolean {
    let userData = JSON.parse(localStorage.getItem('userInfo'))
    //console.log(userData)
    
    if(userData){
     console.log("log", userData.name)
      return true;
    }
    return false;
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
   // console.log(JSON.stringify(user))
   
   console.log("here", user, localStorage.getItem('userInfo'))
  }


  public validate(username, password) {
   return this.http.post("http://localhost:3000/authenticate", {"username": username, 'password': password})
  }
}
