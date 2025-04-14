import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-employee-navbar',
  imports: [],
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.scss'
})
export class EmployeeNavbarComponent {
  constructor(private router:Router){}

    goToBill(){
      this.router.navigate(['/employee/billing'])
    }

    viewStaff() {
        const userString = sessionStorage.getItem('user');
        
        if (userString) {
          const user = JSON.parse(userString);
          const userId = user.userId;
      
          this.router.navigate(['/editEmployee', userId]); 
        } else {
          console.error('User not found in sessionStorage');
        }
    }
}
