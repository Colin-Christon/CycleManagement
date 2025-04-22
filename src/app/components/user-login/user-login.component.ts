import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../services/auth/auth-service.service';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthServiceService, private router: Router) {}

  ngOnInit() : void {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    sessionStorage.clear();
  }

  get errorMessage(): string {
    const email = this.loginForm.get('emailId');
    const password = this.loginForm.get('password');
  
    if (email?.touched && email.errors) {
      if (email.errors['required']) return 'Email is required';
      if (email.errors['email']) return 'Please enter a valid email address';
    }
  
    if (password?.touched && password.errors) {
      if (password.errors['required']) return 'Password is required';
      if (password.errors['minlength']) return 'Password must be at least 6 characters';
    }
  
    if (this.loginForm.invalid) {
      return 'Please fill all the required fields';
    }
  
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        emailId: this.loginForm.value.emailId,
        password: this.loginForm.value.password,
      };
      this.authService.login(credentials).subscribe({
        next: (res: any) => {
          sessionStorage.setItem('authToken', res.token); 
          sessionStorage.setItem('user', JSON.stringify(res.result));
          this.router.navigate(['/admin/dashboard']);
        },
        error: (err: any) => alert(err.error || 'Login failed!')
      });
    }
     else {
      alert('Please fill in valid credentials.');
    }
  } 
}
