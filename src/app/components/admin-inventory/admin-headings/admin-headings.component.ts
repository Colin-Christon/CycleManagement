import {Location} from '@angular/common'
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-headings',
  imports: [],
  templateUrl: './admin-headings.component.html',
  styleUrl: './admin-headings.component.scss'
})
export class AdminHeadingsComponent {
  constructor( private location: Location,
    private router:Router
  ){}

  goBack(){
    this.location.back()
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
