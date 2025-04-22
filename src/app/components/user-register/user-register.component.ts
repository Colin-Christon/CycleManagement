import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent implements OnInit {
  registrationForm!:FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthServiceService,private route : Router) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone :['',[Validators.required]],
      role: ['Employee', [Validators.required]],
      gender : ['male']
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const user = {
        name: this.registrationForm.value.name,
        emailId: this.registrationForm.value.email,
        password: this.registrationForm.value.password,
        phone : this.registrationForm.value.phone,
        role: this.registrationForm.value.role,
        gender: this.registrationForm.value.gender
      };

      this.authService.register(user).subscribe({
        next: (res) => {
          alert('User registered successfully!')
            this.route.navigate(['/login']);
        },
        error: (err: any) => {
          if (err.status === 409) {
            alert('User already registered with this email!');
          } else {
            alert(err.error?.message || 'Registration failed!');
          }
        }
      });
    } else {
      alert('Please fill the form correctly.');
    }
  }
}
