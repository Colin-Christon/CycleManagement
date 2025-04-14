import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-register',
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.scss'
})
export class UserRegisterComponent {
  registrationForm:FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private route : Router) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone :['',[Validators.required]],
      role: ['Employee', [Validators.required]],
      gender : ['male']
    });
  }
  onSubmit2(){
    console.log(this.registrationForm.get('gender')?.value);
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

      console.log(user);

      this.http.post('http://localhost:5085/api/users/register', user).subscribe({
        next: (res) => {
          alert('User registered successfully!')
          if(user.role ==="Admin"){
            this.route.navigate(['/admin/dashboard']);
          }
          else{
            this.route.navigate(['/employee/cycleHome'])
          }
        }
          ,
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
