import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface Customer {
  customerId: string;
  customerName: string;
  email?: string;
  phoneNumber: string;
  address?: string;
  createdDate: string;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private customerData: Customer | null = null;
  private apiUrl = "http://localhost:5085/api/Customer";
  constructor(private http:HttpClient) { }

  setCustomer(data: Customer): void {
    this.customerData = data;
  }

  getCustomer(): Customer | null {
    return this.customerData;
  }

  addCustomer(customer: any): Observable<any> {
    return this.http.post(this.apiUrl, customer);
  }

  clearCustomer(): void {
    this.customerData = null;
  }

  checkPhone(phone: string): Observable<any> {
    return this.http.get<any>(`http://localhost:5085/api/Customer/checkPhone/${phone}`);
  }
}
