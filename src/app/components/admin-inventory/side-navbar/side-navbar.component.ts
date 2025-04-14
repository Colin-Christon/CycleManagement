import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './side-navbar.component.html',
  styleUrl: './side-navbar.component.scss'
})
export class SideNavbarComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([`/admin/${route}`]);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}
