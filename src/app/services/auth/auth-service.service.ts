import { Injectable } from '@angular/core';


enum Role{
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor() { }

  public isAuthenticated():boolean{
    const tokenString = sessionStorage.getItem('user');
    let token = null;
    console.log(tokenString);
    if (tokenString) {
      try {
        token = JSON.parse(tokenString);
        if(token.role == Role.ADMIN){
          return true;
        }
      } catch (error) {
        console.error("Failed to parse token:", error);
      }
    } else {
      console.warn("No token found in sessionStorage.");
    }
      return false;
  }
}
