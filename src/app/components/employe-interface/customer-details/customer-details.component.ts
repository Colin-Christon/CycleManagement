import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Customer, CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-customer-details',
  imports: [FormsModule,ReactiveFormsModule],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.scss'
})
export class CustomerDetailsComponent {

  customerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private location:Location
  ) {}

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      customerName: ['', Validators.required],
      email: ['', [Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['']
    });
  }


    saveCustomerDetails() {
      console.log('Customer Details:', this.customerForm.value);
      // You can send this.customer to your backend if needed
    }
    
    onSubmit(){

      if (this.customerForm.valid) {
        const formValue: Customer = {
          ...this.customerForm.value,
          createdDate: new Date().toISOString()
        };
  
        this.customerService.setCustomer(formValue);
        this.router.navigate(['/employee/paymentMethod']);
      }
    }
    goBack(){
      this.location.back();
    }
}
