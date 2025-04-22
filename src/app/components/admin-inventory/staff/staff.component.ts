import { Component } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Employee, EmployeeService } from '../../../services/employees/employee.service';

@Component({
  selector: 'app-staff',
  imports: [AdminHeadingsComponent,CommonModule,RouterLink],
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.scss'
})
export class StaffComponent {
  staffList: Employee[] = [];
  overlayScreen:boolean = false;
  employeeIdToDelete: string = '';

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
    this.employeeIdToDelete = id;
    this.overlayScreen = true;
  
  }

  viewStaff(userId: string) {
    this.router.navigate(['/editEmployee', userId]); 
  }

  editStaff(id: string) {
    console.log('Editing Employee:', id);
  }

  confirmDelete(){
    this.employeeService.deleteEmployee(this.employeeIdToDelete).subscribe({
          next:(res)=>{ alert(res.message) }
        });
        this.overlayScreen = false;
  }

  cancelDelete(){
    this.overlayScreen = false;
    this.employeeIdToDelete = '';
  }
}
