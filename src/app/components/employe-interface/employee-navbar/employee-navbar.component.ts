import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-navbar',
  imports: [],
  templateUrl: './employee-navbar.component.html',
  styleUrl: './employee-navbar.component.scss'
})
export class EmployeeNavbarComponent implements OnInit {
  currentLocation: string = '';
  constructor(private router:Router){}

    ngOnInit(): void {
    console.log(this.getCurrentLocation());
    }
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

    getCurrentLocation() {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            console.log('Latitude:', latitude);
            console.log('Longitude:', longitude);
    
            // You can store or use the values as needed
          },
          (error) => {
            console.error('Error getting location:', error.message);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
      }
    }
    
}
