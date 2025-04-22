import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Cycle, CycleService } from '../../../services/cycleInventory/cycle.service';

@Component({
  selector: 'app-cycle-desc',
  imports: [],
  templateUrl: './cycle-desc.component.html',
  styleUrl: './cycle-desc.component.scss'
})
export class CycleDescComponent implements OnInit {

  cycle: Cycle|null = null;
 

  constructor(private location: Location,
    private route:ActivatedRoute,
    private cycleService:CycleService,
    private router:Router
  ) {}

  ngOnInit(): void {
    const cycleId = this.route.snapshot.paramMap.get('cycleId');
    if (cycleId) {
      this.cycleService.getCycleById(cycleId).subscribe({
        next: (data) => {
          this.cycle = data;
  
          console.log("Cycle Data:", this.cycle);
          // if (this.cycle.imageBase64) {
          //   this.cycle.imageBase64 = `data:image/png;base64,${this.cycle.imageBase64}`;
          // }
        },
        error: (err) => console.error("Error fetching cycle data", err),
      });
    }
    
  }

  goBack(){
    this.location.back();
  }

  billCycle(cycleId:string){
    this.router.navigate(["/employee/billing",cycleId])
  }
}
