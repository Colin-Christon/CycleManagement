import { Component } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Employee, EmployeeService } from '../../../services/employee.service';

@Component({
  selector: 'app-staff',
  imports: [AdminHeadingsComponent,CommonModule,RouterLink],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {
  staffList: Employee[] = [];
  
  constructor(private employeeService: EmployeeService,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.fetchStaff();
  }

  fetchStaff() {
    this.employeeService.getEmployees().subscribe((data) => {
      this.staffList = data;
      console.log(data);
    });
  }

  deleteStaff(id: string) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe({
        next:(res)=>{ alert(res.message) }
      }
      );
    }
  }

  viewStaff(userId: string) {
    this.router.navigate(['/admin/editEmployee', userId]); 
  }

  editStaff(id: string) {
    console.log('Editing Employee:', id);
  }
}
