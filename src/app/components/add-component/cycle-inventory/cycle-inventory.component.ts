import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { CategoryService } from '../../../services/category/category.service';
import { Cycle, CycleService } from '../../../services/cycleInventory/cycle.service';
import { AdminHeadingsComponent } from "../../admin-inventory/admin-headings/admin-headings.component";


@Component({
  selector: 'app-cycle-inventory',
  imports: [CommonModule, ReactiveFormsModule, AdminHeadingsComponent],
  templateUrl: './cycle-inventory.component.html',
  styleUrl: './cycle-inventory.component.scss'
})
export class CycleInventoryComponent {
  cycleForm: FormGroup;
  categories: any[] = [];
  selectedImage: File | null = null;
  imagePreview: string | null = null;
  tyreSizes: number[] = [];
  constructor(
    private fb: FormBuilder,
    private cycleService: CycleService,
    private categoryService: CategoryService
  ) {
    this.cycleForm = this.fb.group({
      name: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      isAvailable: ['true', Validators.required],
      description: ['', Validators.required],
      tyreSize: ['', Validators.required],
      ImageBase64: [null]
    });
  }

  ngOnInit() {
    this.loadCategories();
    this.tyreSizes = Array.from({ length: 6 }, (_, i) => 20 + i * 2)
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe((data: any) => {
      console.log(data);
      this.categories = data;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result?.toString().split(',')[1]; // extract base64
        this.imagePreview = base64 || null;

        this.cycleForm.patchValue({
          ImageBase64: base64
        });
      };
    }
  }

  addCycle() {
    if (this.cycleForm.invalid){
      console.log(this.cycleForm);
      return;
    }

    const formValues = this.cycleForm.getRawValue();

    const cycleData = {
      name: formValues.name,
      brand: formValues.brand,
      model: formValues.model,
      price: formValues.price,
      rating: formValues.rating,
      categoryId: formValues.categoryId,
      categoryName: '', // If needed, otherwise backend can populate it
      stock: formValues.stock,
      isAvailable: true,
      imageBase64: formValues.ImageBase64,
      specifications: [
        {
          wheelSize: formValues.tyreSize,
          description: formValues.description
        }
      ]
    };
    console.log(cycleData);
    this.cycleService.addCycle(cycleData).subscribe({
      next: () => alert('Cycle added successfully!'),
      error: () => alert('Failed to add cycle.')
    });
  }
}


