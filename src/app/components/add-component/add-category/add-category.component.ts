import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
  categoryForm: FormGroup;

  constructor(private fb: FormBuilder, private http:HttpClient,
    private router:Router
  ) {
    this.categoryForm = this.fb.group({
      CategoryName: ['', Validators.required],
      Description: ['']
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      console.log('New Category:', this.categoryForm.value);
      this.http.post('http://localhost:5085/api/category', this.categoryForm.value)
        .subscribe({
          next: (res) =>{ alert('Category added successfully!');
            this.router.navigate(['/admin/menu']);
          },
          error: (err) => alert('Error adding category')
        });
    }
  }

  onCancel() {
      
    this.router.navigate(['/admin/menu']);
  }
}
