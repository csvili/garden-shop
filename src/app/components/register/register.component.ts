import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { email, password } = this.registerForm.value;
      this.authService.register(email, password).then(result => {
        this.router.navigate(['/']);
      }).catch(error => {
        console.error('Registration error:', error);
      });
    }
  }

  getEmailErrorMessage() {
    if (this.registerForm.get('email')?.hasError('required')) {
      return 'Email is required';
    }
    return this.registerForm.get('email')?.hasError('email') ? 'Not a valid email' : '';
  }

  getPasswordErrorMessage() {
    if (this.registerForm.get('password')?.hasError('required')) {
      return 'Password is required';
    }
    return this.registerForm.get('password')?.hasError('minlength') ? 'Password must be at least 6 characters' : '';
  }
}
