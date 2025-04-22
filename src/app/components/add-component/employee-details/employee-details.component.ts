import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdminHeadingsComponent } from "../../admin-inventory/admin-headings/admin-headings.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Employee, EmployeeService} from '../../../services/employees/employee.service';

@Component({
  selector: 'app-employee-details',
  imports: [CommonModule, ReactiveFormsModule, AdminHeadingsComponent],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  isEditing = false;
  employeeForm!:FormGroup;
  employe: Employee | null = null;
  constructor(private fb: FormBuilder,private route: ActivatedRoute,private employeeService : EmployeeService,
    private router:Router
  ) {
    
  }

  async ngOnInit(): Promise<void> {
    const userId = this.route.snapshot.paramMap.get('userId');
    await this.employeeService.getEmployeeById(userId).subscribe({
      next: (data) => {
        this.employe = data;
        console.log("Employee Data:", this.employe); 
      },
      error: (err) => console.error("Error fetching employee data", err),
    });

    console.log(userId);
    console.log(this.employeeForm.value);
  }


  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.employeeForm = this.fb.group({
        name: [this.employe?.name],
        emailId: [this.employe?.emailId],
        phone: [this.employe?.phone],
        gender: [this.employe?.gender],
        address: [this.employe?.address],
        role: [this.employe?.role],
        salary: [this.employe?.salary],
        shiftStartTime: [this.formatTime(this.employe?.shiftStartTime)],
        shiftEndTime: [this.formatTime(this.employe?.shiftEndTime)]
      });
    }
  }

  onSubmit() {
    console.log("clicked");
    if (this.employeeForm.valid) {
      const updatedEmployee = { ...this.employeeForm.value ,

      };
      updatedEmployee.shiftStartTime = this.employeeForm.value.shiftStartTime+":00";
      updatedEmployee.shiftEndTime = this.employeeForm.value.shiftEndTime+":00";
      updatedEmployee.userId = this.employe?.userId; 
     
  
      
      this.employeeService.updateEmployee(updatedEmployee).subscribe({
        next: () => {
          alert('Employee updated successfully');
          this.isEditing = !this.isEditing;
        },
        error: (err) => {
          console.error('Error updating employee:', err);
          alert('Error updating employee');
        }
      });
    }
  }

  formatTime(time: string | undefined): string {
    return time ? time.substring(0, 5) : "00:00"; // Extract HH:mm from HH:mm:ss
  }

  logout(){
    this.router.navigate(['/login'])
  }
}
  // Employee Data




 

