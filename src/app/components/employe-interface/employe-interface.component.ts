import { Component } from '@angular/core';
import { EmployeeNavbarComponent } from "./employee-navbar/employee-navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-employe-interface',
  imports: [EmployeeNavbarComponent,RouterOutlet],
  templateUrl: './employe-interface.component.html',
  styleUrl: './employe-interface.component.scss'
})
export class EmployeInterfaceComponent {

}
