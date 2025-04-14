import { Injectable } from '@angular/core';
import { Cycle } from '../cycle.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface OrderSummary {
  orderId: string;
  customerId: string;
  customerName: string;
  status: string;
  trackingCode: string;
  orderDate: string; 
  itemCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private selectedCycleData: Cycle[] = [];
  private apiUrl = "http://localhost:5085/api/Order";
  private orderId = "";
  constructor(private http:HttpClient) { }

  setSelectedCycle(cycle: Cycle[]) {
    this.selectedCycleData = cycle;
  }

  setOrderId(orderId:string){
    this.orderId = orderId;
  }

  getOrderId():string{
    return this.orderId;
  }

  getOrderDetails(): Observable<any>{
    return this.http.get(`${this.apiUrl}/${this.orderId}`)
  }

  getOrderItem(orderId:string): Observable<any>{
    return this.http.get(`${this.apiUrl}/${orderId}`)
  }

  getAllOrder():Observable<any>{
    return this.http.get(`${this.apiUrl}/all`);
  }

  getSelectedCycle(): Cycle[] {
    return this.selectedCycleData;
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post(this.apiUrl, order,
      {headers: {
      'Content-Type': 'application/json'
        }
    });
  }

  clearSelectedCycle() {
    this.orderId = "";
    this.selectedCycleData = [];
  }
}
