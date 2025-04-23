import { Component, OnInit } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { CommonModule } from '@angular/common';
import { OrderService } from '../../../services/billing/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-tracking',
  imports: [AdminHeadingsComponent,CommonModule],
  templateUrl: './order-tracking.component.html',
  styleUrl: './order-tracking.component.scss'
})
export class OrderTrackingComponent implements OnInit {
  orderId:string|null = '';

  orderDate = '2024-04-20';
  estimatedDeliveryDate = '2024-04-25';
  trackingId = 'TRK123456789';
  selectedOrder: any = null;
  orderStatus = [
    { label: 'Order Confirmed', date: '2024-04-20', completed: true },
    { label: 'Shipped', date: '2024-04-21', completed: true },
    { label: 'Out for Delivery', date: null, completed: false },
    { label: 'Delivered', date: null, completed: false }
  ];

  orderItems = [
    { name: 'Mountain Bike', quantity: 1, price: 12000 },
    { name: 'Helmet', quantity: 1, price: 1500 }
  ];

  paymentType = 'Credit Card';
  deliveryAddress = '123, Main Street, City, Country';
  itemTotal = 13500;
  deliveryCharges = 100;
  totalAmount = 13600;

  constructor(private orderService:OrderService,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('orderId');
    if(this.orderId){
      this.getOrderDetails(this.orderId);
    }
  }

  getOrderDetails(orderId: string) {
    this.orderService.getOrderItem(orderId).subscribe({
      next:(order)=> {
        console.log(order);
        this.selectedOrder = order;
        this.totalAmount = order.items.reduce((sum: number, item: any) => sum + item.total, 0);
      },
      error:(err)=> console.log(err)
    })
  }
}
