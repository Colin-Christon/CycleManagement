import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/billing/order.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrderReceiptComponent } from "../../order-receipt/order-receipt.component";

@Component({
  selector: 'app-payment-successful',
  imports: [CommonModule, OrderReceiptComponent],
  templateUrl: './payment-successful.component.html',
  styleUrl: './payment-successful.component.scss'
})
export class PaymentSuccessfulComponent implements OnInit {
  totalAmount = 0;
  orderId:string = "";
  viewOrderDetails = false;
  selectedOrder:any;
  constructor(
    private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.orderService.getOrderDetails().subscribe({
      next:(order)=> {
        this.selectedOrder = order;
        this.orderId = this.orderService.getOrderId().slice(0,5)
        this.totalAmount = order.items.reduce((sum: number, item: any) => sum + item.total, 0);
      },
      error:(err)=> console.log(err)
    })
  }
  printReceipt(){
    this.viewOrderDetails = true;
    setTimeout(() => {
      window.print();
  
    
      this.viewOrderDetails = false;
    }, 100);
  }

  viewOrder(){
    this.viewOrderDetails = true;
  }
}
