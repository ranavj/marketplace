import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../+state/auth/auth.actions';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';
  errorMessage = signal(''); // Signals use kar rahe hain for zoneless update

  private authService = inject(AuthService);
  private store = inject(Store);
  private router = inject(Router);

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login Success:', response);
        // 1. Save to NgRx Store
        this.store.dispatch(loginSuccess({ token: response.accessToken, user: response.user }));
        // 2. Navigate to Shop
        this.router.navigate(['/discovery']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.errorMessage.set('Invalid email or password');
      }
    });
  }
}
