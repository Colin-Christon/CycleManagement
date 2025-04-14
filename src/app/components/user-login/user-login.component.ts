import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['Employee', [Validators.required]]
    });

    sessionStorage.clear();
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credentials = {
        name:"colin1",
        emailId: this.loginForm.value.emailId,
        password: this.loginForm.value.password,
        role: "admin"
      };
      console.log(credentials);
      this.http.post('http://localhost:5085/api/users/login', credentials).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.token) {
            sessionStorage.setItem('authToken', res.token); 
          }
  
          sessionStorage.setItem('user', JSON.stringify({
            userId: res.result.userId,
            username: res.result.name,
            email: res.result.email,
            role:  res.result.role
          }));
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
