import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Employee {
  userId: string;
  name: string;
  emailId: string;
  phone: string;
  gender: String;
  role:String;
  address:String;
  age: number;
  salary: number;
  shiftStartTime: string;
  shiftEndTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:5085/api/users'; // Backend API

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/getEmployee`);
  }

  getEmployeeById(id: string|null):Observable<Employee>{
    const url1 = `${this.apiUrl}/${id}`
    return this.http.get<Employee>(url1);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, employee);
  }

  deleteEmployee(id: string): Observable<any> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
