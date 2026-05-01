import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  submit() {
    if (!this.email || !this.password) {
      this.error.set('გთხოვთ შეავსოთ ყველა ველი');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    this.auth.signIn({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.error.set('არასწორი მეილი ან პაროლი');
        this.isLoading.set(false);
      }
    });
  }
}
