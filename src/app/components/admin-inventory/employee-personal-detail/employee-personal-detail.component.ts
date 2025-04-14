import { Component } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-personal-detail',
  imports: [AdminHeadingsComponent,RouterLink],
  templateUrl: './employee-personal-detail.component.html',
  styleUrl: './employee-personal-detail.component.scss'
})
export class EmployeePersonalDetailComponent {
  selectedEmployee = {
    id: 1,
    profilePic: '/assets/images/profile.jpg',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    dob: '1992-04-15',
    address: '123 Elm Street, NY',
    role: 'Manager',
    salary: '$5000',
    shiftStart: '9:00 AM',
    shiftEnd: '6:00 PM'
  };
  
  editProfile(id: number) {
    console.log('Editing profile for:', id);
  }
  
  deleteProfile(id: number) {
    console.log('Deleting profile for:', id);
    // Add confirmation modal logic if needed
  }
}
