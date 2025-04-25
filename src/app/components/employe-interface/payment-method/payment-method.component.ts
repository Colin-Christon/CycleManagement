import { Component, OnInit } from '@angular/core';
import { CommonModule, Location  } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderService } from '../../../services/billing/order.service';
import { Cycle } from '../../../services/cycleInventory/cycle.service';
import { Customer, CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-payment-method',
  imports: [CommonModule],
  templateUrl: './payment-method.component.html',
  styleUrl: './payment-method.component.scss'
})
export class PaymentMethodComponent implements OnInit{
  selectedPaymentMethod: string = "cash";
  showCashConfirmation: boolean = false;
  selectedOption: string = 'no'; 
  cycles: Cycle[] = [];
  customer:Customer|null = null
  productAmount = 0;

  constructor ( private location: Location,
    private router:Router,
    private orderService : OrderService,
    private customerService:CustomerService
  ){}

  ngOnInit() {
    this.cycles = this.orderService.getSelectedCycle();
    this.customer = this.customerService.getCustomer();

    this.productAmount = this.getTotalAmount();
    console.log(this.customer);
  }

  getTotalAmount(): number {
    return this.cycles.reduce((total, cycle) => {
      const quantity = cycle.stock; 
      return total + (cycle.price * quantity);
    }, 0);
  }

  selectPaymentMethod(event: any) {
    this.selectedPaymentMethod = event.target.value;
    console.log("Selected Payment Method:", this.selectedPaymentMethod);
  }

  setOption(option: string) {
    console.log(option);
    this.selectedOption = option;
  }

  processPayment(){
    if (this.selectedPaymentMethod === 'cash') {
      this.showCashConfirmation = true;
    } 
    else if (this.selectedPaymentMethod === 'qrcode') {
      this.router.navigate(['/employee/upi']);
    }
  }

  confirmCashPayment(isPaid: boolean) {
    if (isPaid) {
      
      const customer = this.customer;
  
      console.log("customer",customer);
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
              price: cycle.price ,
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
  
    this.showCashConfirmation = false;
  }
  
  generateTrackingCode(): string {
    return 'TRK' + Math.random().toString(36).substring(2, 10).toUpperCase();
  }
  goBack(){
    this.location.back();
  }
}
