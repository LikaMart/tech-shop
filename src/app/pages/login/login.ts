import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error = signal<string>('');
  isLoading = signal<boolean>(false);

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  submit() {
    if (this.form.invalid) return;
    this.isLoading.set(true);
    this.error.set('');

    this.auth.signIn(this.form.value as any).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => {
        this.error.set('არასწორი მეილი ან პაროლი');
        this.isLoading.set(false);
      }
    });
  }
}
