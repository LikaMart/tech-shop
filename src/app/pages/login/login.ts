import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import { LanguageService } from '../../core/services/language';

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
  lang = inject(LanguageService);

  email = '';
  password = '';
  error = signal<string>('');
  isLoading = signal<boolean>(false);

  submit() {
    if (!this.email || !this.password) {
      this.error.set(this.lang.translations().loginError);
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    this.auth.signIn({ email: this.email, password: this.password }).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.error.set(this.lang.translations().loginError);
        this.isLoading.set(false);
      }
    });
  }
}
