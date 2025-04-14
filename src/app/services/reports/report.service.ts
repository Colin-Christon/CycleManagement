import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://localhost:5085/api/Report'; // Update if needed

  constructor(private http: HttpClient) { }


  getOrderReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/order`);
  }


  getRevenueReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/revenue`);
  }

  getCustomerReport(): Observable<any> {
    return this.http.get(`${this.baseUrl}/customer`);
  }
}
