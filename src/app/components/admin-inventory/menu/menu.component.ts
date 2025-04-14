import { CommonModule, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { Router, RouterLink } from '@angular/router';
import { Category, CategoryService } from '../../../services/category.service';
import { Cycle ,CycleService } from '../../../services/cycle.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-menu',
  imports: [CommonModule, AdminHeadingsComponent,RouterLink,NgClass, ReactiveFormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  categories: Category[] = [];
  cycles : Cycle[] = []
  errorMessage: string = '';
  editForm!: FormGroup;
  isEditModalOpen = false;
  selectedCycle: any = null;

  constructor( private categoryService : CategoryService,
    private cycleService : CycleService,
    private route : Router,
    private fb : FormBuilder,
  ) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchCycles();
  }
  
  fetchCategories() {
    
      this.categoryService.getCategories().subscribe({
        next: (data) => {
          this.categories = data
          console.log(data);
        }
          ,
        error: (err) => console.error('Error fetching categories', err)
      });
  }

  fetchCycles() {
    this.cycleService.getCycles().subscribe({
      next: (data) => this.cycles = data, 
      error: (err) => this.errorMessage = err.message
    });
  }

  deleteCategory(categoryId: string) {
    if (confirm("Are you sure you want to delete this category?")) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: () => {
          alert("Category deleted successfully!");
          this.fetchCategories(); 
        },
        error: (err) => {
          console.error("Failed to delete category", err);
          alert("Failed to delete category.");
        }
      });
    }
  }


  openEditModal(cycle: any) {
    this.selectedCycle = cycle;
    this.isEditModalOpen = true;
    
    // Populate form with cycle data
    this.editForm = this.fb.group({
      image: [cycle.imageBase64],
      name: [cycle.name],
      stock: [cycle.stock],
      categoryName: [cycle.categoryName],
      price: [cycle.price],
      isAvailable: [cycle.isAvailable]
    });
  }

  closeEditModal() {
    this.isEditModalOpen = false;
  }


  updateCycle() {
    
    const updatedCycle = { ...this.selectedCycle, ...this.editForm.value };
    if(this.editForm.value.stock==0){
      updatedCycle.isAvailable = false;
    }
    console.log(updatedCycle);
    this.cycleService.updateCycle(updatedCycle).subscribe(() => {
      this.fetchCycles();
      this.closeEditModal();
    });
  }

  deleteInventory(cycleId: string) {
    if (confirm('Are you sure you want to delete this cycle?')) {
      this.cycleService.deleteCycle(cycleId).subscribe({
        next: () => {
          this.cycles = this.cycles.filter(cycle => cycle.cycleId !== cycleId);
          this.fetchCategories();
          alert('Cycle deleted successfully!');
        },
        error: (err) => alert(err.message)
      });
    }
  }
}
