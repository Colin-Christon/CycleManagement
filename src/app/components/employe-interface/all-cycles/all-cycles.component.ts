import { Component, OnInit } from '@angular/core';
import { Cycle, CycleService } from '../../../services/cycle.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-cycles',
  imports: [CommonModule],
  templateUrl: './all-cycles.component.html',
  styleUrl: './all-cycles.component.scss'
})
export class AllCyclesComponent implements OnInit {
  cycles : Cycle[] = [];

  constructor(private cycleService: CycleService,
    private router:Router,
    private location:Location
  ){}

  ngOnInit(): void {
    this.cycleService.getCycles().subscribe({
      next:(data)=>{
        this.cycles = data
        console.log(this.cycles);
      },
      error:(err)=> console.log(err)
    })
  }

  viewCycleDesc(cycle:Cycle){
    this.router.navigate(['/employee/cycledesc',cycle.cycleId])
  }

  goBack(){
    this.location.back();
  }
}
