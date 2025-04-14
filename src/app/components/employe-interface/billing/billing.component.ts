import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cycle, CycleService } from '../../../services/cycle.service';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../../services/billing/order.service';
import { CustomerService } from '../../../services/customer/customer.service';

@Component({
  selector: 'app-billing',
  imports: [CommonModule,FormsModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss'
})
export class BillingComponent implements OnInit {

  cycles: Cycle[] = [];
  tempCycle:Cycle[] = [];
  searchResults: Cycle[] = [];
  matchResults : Cycle[] = [];
  searchQuery: string = '';
  totalAmout : number = 0;
  phoneNumber: string = '';
  phonePlaceholder: string = 'Phone Number';

  constructor(private location : Location,
       private cycleService:CycleService,
       private customerService:CustomerService,
      private route:ActivatedRoute,
      private router:Router,
      private orderService: OrderService
  ){}

  ngOnInit(): void {
    this.orderService.clearSelectedCycle();
    const cycleId = this.route.snapshot.paramMap.get('cycleId')
    if (cycleId) {
      this.cycleService.getCycleById(cycleId).subscribe({
        next: (data:Cycle) => {
          this.tempCycle = [data];
          const cycleWithOrderStock = { ...data, 
            stock: 1,
           }; 
          this.cycles = [cycleWithOrderStock];

          this.totalAmout = data.price;

          if (this.cycles[0].imageBase64) {
            this.cycles[0].imageBase64 = `data:image/png;base64,${this.cycles[0].imageBase64}`;
          }
        },
        error: (err) => console.error("Error fetching cycle data", err),
      });
    
  }

  this.cycleService.getCycles().subscribe({
    next:(data)=>{
      this.tempCycle = data;
      // console.log(data);
      this.searchResults = data;
      this.searchResults = data.map(cycle => ({
        ...cycle,
        stock: 1
      }));
      
    },
    error:(err)=> console.log(err)
  })
}

searchCycle(event:any) {
  if (this.searchQuery.trim() !== '') {
    this.matchResults = this.searchResults.filter(cycle => 
      cycle.name.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  
  } else {
    this.matchResults = []; 
  }
}


selectCycle(cycle: Cycle) {
  if (!this.cycles.some(c => c.cycleId === cycle.cycleId)) {
    this.cycles.push(cycle);
    this.totalAmout += cycle.price;
  }
  this.searchQuery = '';
  this.matchResults = [];
  
}

increaseStock(cycle: Cycle) {
  const cyc = this.tempCycle.filter(c=> c.cycleId==cycle.cycleId);
 
  if(cycle.stock< cyc[0].stock){
    cycle.stock++;
    cycle.price = cycle.stock * cyc[0].price;
  }
  this.totalAmout = 0;
  this.cycles.forEach(cycle=>{
    this.totalAmout+= cycle.price;
  })
}

decreaseStock(cycle:Cycle){
  const cyc = this.tempCycle.filter(c=> c.cycleId==cycle.cycleId);
  if(cycle.stock>1){
    cycle.stock--;
    cycle.price = cycle.stock * cyc[0].price;
  }
  this.totalAmout = 0;
  this.cycles.forEach(cycle=>{
    this.totalAmout+= cycle.price;
  })
  
}

  removeItem(cycle:Cycle,cycleId:string){
    this.cycles = this.cycles.filter(cycle => cycle.cycleId !== cycleId);
    this.totalAmout -= cycle.price;
  }

  goToCheckout(){
    if(this.phoneNumber.trim() == '' || this.phoneNumber.length < 10){
      this.phonePlaceholder = 'Please enter your phone number';
      
      this.phoneNumber = '';
      return;
    }
  
    if(this.totalAmout >0){
      this.cycles.forEach((cycle)=>{
        cycle.price = cycle.price / cycle.stock;
      })

      this.orderService.setSelectedCycle(this.cycles);
      this.customerService.checkPhone(this.phoneNumber).subscribe({
        next:(res)=>{
          if(!res.exists){
            this.router.navigate(['/employee/customerDetails'])
          }
          else{
            console.log("clicked");
            this.customerService.setCustomer(res.data)
            this.router.navigate(['/employee/paymentMethod'])
          }
        },
        error:(err)=>{console.error(err);}
      })
      
    }
  }
  goBack(){
    this.location.back();
  }
}
