import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerService } from '../../../services/customer/customer.service';
import { Cycle } from '../../../services/cycle.service';
import { OrderService } from '../../../services/billing/order.service';

@Component({
  selector: 'app-upi-payment',
  imports: [CommonModule],
  templateUrl: './upi-payment.component.html',
  styleUrl: './upi-payment.component.scss'
})
export class UpiPaymentComponent {
  showUpiConfirmation = false;
  cycles: Cycle[] = [];
    customer:Customer|null = null;
    productAmount = 0;
  constructor(private router:Router,
    private orderService : OrderService,
    private customerService:CustomerService
  ){}

  ngOnInit() {
    this.cycles = this.orderService.getSelectedCycle();
    this.customer = this.customerService.getCustomer();
    console.log(this.cycles);
    console.log("customer",this.customer);
    this.productAmount = this.getTotalAmount();
  }

  getTotalAmount(): number {
    return this.cycles.reduce((total, cycle) => {
      const quantity = (cycle as any).quantity || 1; 
      return total + (cycle.price * quantity);
    }, 0);
  }

  getPaymentStatus(){
    this.showUpiConfirmation = true;
  }

  confirmCashPayment(isPaid: boolean) {
    if (isPaid) {
      
      const customer = this.customer;
  
      console.log(customer);
      this.customerService.addCustomer(customer).subscribe({
        next: (res) => {
          const customerId = res.customerId;

          const orderRequest = {
            customerId: customerId,
            customerName: res.customerName,
            status: 'Confirmed',
            trackingCode: this.generateTrackingCode(),
            items: this.cycles.map(cycle => ({
              cycleId: cycle.cycleId,
              productName: cycle.name,
              quantity: cycle.stock,
              price: cycle.price,
              total: cycle.price * cycle.stock
            }))
          };
  
          this.orderService.placeOrder(orderRequest).subscribe({
            next: (res) => {
              this.orderService.setOrderId(res.orderId);
              this.router.navigate(['/employee/paymentSuccess']);
            },
            error: err => {
              console.error("Error placing order", err);
            }
          });
        },
        error: err => {
          console.error("Error adding customer", err);
        } 
      });
    } else {
      console.log("Cash payment not received!");
    }
  
    this.showUpiConfirmation = false;
  }

  generateTrackingCode(): string {
    return 'TRK' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
}
