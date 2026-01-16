import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthFacade } from '@marketplace/shared/data-store'; // ✅ ADD FACADE

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  providers: [AuthFacade]
})
export class Login {
  email = '';
  password = '';
  errorMessage = signal('');

  private authService = inject(AuthService);
  private authFacade = inject(AuthFacade); // ✅ Store ki jagah Facade
  private router = inject(Router);

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login Success:', response);
        
        // 1. Save to State via Facade (Clean & Abstract)
        this.authFacade.setLoginSuccess(response.accessToken, response.user);
        
        // 2. Navigate
        this.router.navigate(['/discovery']);
      },
      error: (err) => {
        console.error('Login Failed:', err);
        this.errorMessage.set('Invalid email or password');
      }
    });
  }
}