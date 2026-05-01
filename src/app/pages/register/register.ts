import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  firstName = '';
  lastName = '';
  email = '';
  password = '';
  confirmPassword = '';
  age = 18;
  phone = '';
  address = '';
  zipcode = '';
  gender: 'MALE' | 'FEMALE' = 'MALE';

  error = signal<string>('');
  isLoading = signal<boolean>(false);

  submit() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.email ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.error.set('გთხოვთ შეავსოთ ყველა ველი');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.error.set('პაროლები არ ემთხვევა');
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    this.auth
      .signUp({
        email: this.email,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        age: this.age,
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + this.email,
        address: this.address,
        phone: this.phone,
        zipcode: this.zipcode,
        gender: this.gender,
      })
      .subscribe({
        next: () => this.router.navigate(['/home']),
        error: () => {
          this.error.set('რეგისტრაცია ვერ მოხერხდა');
          this.isLoading.set(false);
        },
      });
  }
}
