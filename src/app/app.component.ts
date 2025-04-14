import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminInventoryComponent } from "./components/admin-inventory/admin-inventory.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'CycleManagement';
}
