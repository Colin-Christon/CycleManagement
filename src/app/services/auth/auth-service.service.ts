import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

enum Role{
  ADMIN = 'admin',
  EMPLOYEE = 'employee'
}
@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {
  private apiUrl = 'http://localhost:5085/api/users'; 
  
  constructor(private http: HttpClient) { }

  public login(credentials:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  public register(user:any):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  public isAuthenticated():boolean{
    const tokenString = sessionStorage.getItem('user');
    let token = null;
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
