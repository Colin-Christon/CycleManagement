import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SideNavbarComponent } from "./side-navbar/side-navbar.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { MenuComponent } from "./menu/menu.component";
import { AdminHeadingsComponent } from "./admin-headings/admin-headings.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { RouterOutlet } from '@angular/router';

interface Cycle {
  id: number;
  cycleName: string;
  brand: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-admin-inventory',
  imports: [ReactiveFormsModule, CommonModule, SideNavbarComponent,RouterOutlet],
  templateUrl: './admin-inventory.component.html',
  styleUrl: './admin-inventory.component.scss'
})
export class AdminInventoryComponent implements OnInit {
  cycles: Cycle[] = [];
  isEditing: boolean = false;
  editCycleId: number | null = null;

  inventoryForm = new FormGroup({
    cycleName: new FormControl('', [Validators.required]),
    brand: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.min(0)]),
    quantity: new FormControl('', [Validators.required, Validators.min(1)])
  });

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // this.fetchInventory();
  }

  fetchInventory(): void {
    const token = sessionStorage.getItem('authToken'); // Get the token from session storage
  
    if (!token) {
      alert('No token found! Please log in.');
      this.router.navigate(['/login']); // Redirect if no token
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}` // Attach the token
    };
    this.http.get<Cycle[]>('http://localhost:5085/api/cycles',{headers}).subscribe({
      next: (data) => this.cycles = data,
      error: (err) => alert(err.error || 'Failed to fetch inventory!')
    });
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const cycleData = this.inventoryForm.value;

      if (this.isEditing && this.editCycleId !== null) {
        this.updateCycle(this.editCycleId, cycleData);
      } else {
        this.addCycle(cycleData);
      }
    } else {
      alert('Please fill out all fields correctly!');
    }
  }

  addCycle(cycleData: any): void {
    console.log(cycleData);
    const cycleToAdd = {
      ModelName: cycleData.cycleName,
      BrandId: 1001, // Replace with the actual BrandId
      TypeId: 2001,  // Add a valid TypeId
      Price: cycleData.price,
      Stock: cycleData.quantity,
      Description: cycleData.description || '', // Optional but good to include
      CreatedAt: new Date().toISOString() // Ensuring it matches backend's DateTime format
    };
    console.log(cycleToAdd);
    this.http.post('http://localhost:5085/api/cycles', cycleToAdd).subscribe({
      next: () => {
        alert('Cycle added successfully!');
        this.fetchInventory();
        this.inventoryForm.reset();
      },
      error: (err) => alert(err.error || 'Failed to add cycle!')
    });
  }

  editCycle(cycle: Cycle): void {
    this.isEditing = true;
    this.editCycleId = cycle.id;

    this.inventoryForm.setValue({
      cycleName: cycle.cycleName,
      brand: cycle.brand,
      price: cycle.price.toString(),
      quantity: cycle.quantity.toString()
    });
  }

  updateCycle(id: number, cycleData: any): void {
    this.http.put(`http://localhost:5085/api/cycles/${id}`, cycleData).subscribe({
      next: () => {
        alert('Cycle updated successfully!');
        this.fetchInventory();
        this.resetForm();
      },
      error: (err) => alert(err.error || 'Failed to update cycle!')
    });
  }

  deleteCycle(id: number): void {
    if (confirm('Are you sure you want to delete this cycle?')) {
      this.http.delete(`http://localhost:5085/api/cycles/${id}`).subscribe({
        next: () => {
          alert('Cycle deleted successfully!');
          this.fetchInventory();
        },
        error: (err) => alert(err.error || 'Failed to delete cycle!')
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editCycleId = null;
    this.inventoryForm.reset();
  }

  getCycles() {
    const token = sessionStorage.getItem('authToken'); // Get the token from session storage
  
    if (!token) {
      alert('No token found! Please log in.');
      this.router.navigate(['/login']); // Redirect if no token
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${token}` // Attach the token
    };
  
    this.http.get('http://localhost:5085/api/cycles', { headers }).subscribe({
      next: (res: any) => {
        console.log('Cycles data:', res);
      },
      error: (err: any) => {
        console.error('Authorization failed or error occurred:', err);
        alert(err.error || 'Failed to fetch cycles');
      }
    });
  }
}
