import { Component, OnInit } from '@angular/core';
import { EmployeeNavbarComponent } from "../employee-navbar/employee-navbar.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Cycle, CycleService } from '../../../services/cycleInventory/cycle.service';

@Component({
  selector: 'app-cycle-home',
  imports: [CommonModule,RouterLink],
  templateUrl: './cycle-home.component.html',
  styleUrl: './cycle-home.component.scss'
})
export class CycleHomeComponent implements OnInit {
  cycles = [1,2,3,4,5,6,7];

  cycle :Cycle[] = [];

  constructor(private cycleService:CycleService,
    private router:Router
  ){}

   ngOnInit(){
    this.fetchCycles();
    console.log(this.cycle);
    }

  fetchCycles() {
    this.cycleService.getCycles().subscribe({
      next: (data) => this.cycle = data, // Directly assign cycles
      error: (err) => console.log(err.message)
    });
  }

  viewCycleDesc(cycleId:string){
    this.router.navigate(['/employee/cycledesc',cycleId])
  }
}
