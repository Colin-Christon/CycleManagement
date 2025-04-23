import { Component, OnInit } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrderService, OrderSummary } from '../../../services/billing/order.service';
import { OrderReceiptComponent } from "../../order-receipt/order-receipt.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  imports: [AdminHeadingsComponent, ReactiveFormsModule, CommonModule, FormsModule, OrderReceiptComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit {
  orderId: string = '';
  orderStatus: string = '';
  selectedOrder: any = null;
  orders : OrderSummary[] = [];
  tempOrder: OrderSummary[] = [];
  viewOrderDetails = false;
  totalAmount = 0;
  filteredOrders = [...this.orders];

  constructor(
    private orderService:OrderService,
    private router:Router
  ){}

ngOnInit(): void {
  this.orderService.getAllOrder().subscribe({
    next: (order)=>{
      this.orders = order;
      this.tempOrder = [...this.orders]

    },
    error:(err)=> {
      console.log("Error has occured while getting order", err);
    }
  })
 
}

  searchOrder() {

    if(this.orderId.trim()){
      this.filteredOrders = this.orders.filter(order =>
        order.orderId.toLowerCase().includes(this.orderId.trim().toLowerCase())
      );
      this.orders = [...this.filteredOrders]
    }
    else{
      this.orders = [...this.tempOrder]
    }
    
  }

  filterByStatus() {
    this.filteredOrders = this.orderStatus
      ? this.orders.filter(order => order.status === this.orderStatus)
      : [...this.orders];
  }

  viewOrder(order: any) {
    this.router.navigate(['/admin/tracking',order.orderId]);
  }

  printOrder(order: any) {
    this.orderService.getOrderItem(order.orderId).subscribe({
      next:(order)=> {
        console.log(order);
        this.selectedOrder = order;
        this.orderId = this.orderService.getOrderId().slice(0,5)
        this.totalAmount = order.items.reduce((sum: number, item: any) => sum + item.total, 0);
      },
      error:(err)=> console.log(err)
    })
    this.viewOrderDetails = true;
  }

  closePopup() {
    this.selectedOrder = null;
  }

  editOrder(order: any) {
    console.log('Editing order:', order);
    // Placeholder for edit functionality
  }
}
