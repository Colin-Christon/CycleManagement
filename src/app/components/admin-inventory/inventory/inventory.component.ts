import { Component } from '@angular/core';
import { AdminHeadingsComponent } from "../admin-headings/admin-headings.component";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Cycle, CycleService } from '../../../services/cycleInventory/cycle.service';
import { Category, CategoryService } from '../../../services/category/category.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-inventory',
  imports: [AdminHeadingsComponent,CommonModule,RouterLink,ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.scss'
})
export class InventoryComponent {
    filterForm!: FormGroup;
    cycles : Cycle[] = [];
    tempCycles:Cycle[] = [];
    categories: Category[] = [];
    errorMessage: string = '';

    constructor( private categoryService : CategoryService,
        private cycleService : CycleService,
        private fb: FormBuilder
      ) {}
      ngOnInit() {
        this.fetchCategories();
        this.fetchCycles();
      }
      
      fetchCategories() {
        this.filterForm = this.fb.group({
          category: ['all'],
          stock: ['all'],
          quantity: [''],
          priceFrom: [''],
          priceTo: ['']
        });
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
          next: (data) => {this.cycles = data
            this.tempCycles = [...this.cycles];
          }, 
          error: (err) => this.errorMessage = err.message
        });
      }

      deleteInventory(cycleId: string) {
        if (confirm('Are you sure you want to delete this cycle?')) {
          this.cycleService.deleteCycle(cycleId).subscribe({
            next: () => {
              this.cycles = this.cycles.filter(cycle => cycle.cycleId !== cycleId);
              alert('Cycle deleted successfully!');
            },
            error: (err) => alert(err.message)
          });
        }
      }

      onSubmit() {
        console.log(this.filterForm.value);
        this.filterCycles();

      }

      clearFilter() {
        this.filterForm.reset({
          category: 'all',
          stock: 'all',
          quantity: '',
          priceFrom: '',
          priceTo: ''
        });
      
        this.cycles = [...this.tempCycles]; // Reset back to full list
      }

      filterCycles() {
        const form = this.filterForm.value;
      
        this.cycles = this.tempCycles.filter(cycle => {
          const matchesCategory = form.category === 'all' || cycle.categoryId === form.category;
      
          const matchesStock =
            form.stock === 'all' ||
            (form.stock === 'in-stock' && cycle.stock > 0) ||
            (form.stock === 'out-of-stock' && cycle.stock === 0);
      
          const quantityFilter = form.quantity ? cycle.stock >= +form.quantity : true;
      
          const priceFrom = form.priceFrom ? cycle.price >= +form.priceFrom : true;
          const priceTo = form.priceTo ? cycle.price <= +form.priceTo : true;
      
          return matchesCategory && matchesStock && quantityFilter && priceFrom && priceTo;
        });
        console.log(this.cycles);
      }
      
}
