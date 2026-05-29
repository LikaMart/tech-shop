import { Component, inject, signal, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { take } from 'rxjs';
import { CartService } from '../../core/services/cart';
import { ToastService } from '../../core/services/toast';
import { ChatService } from '../../core/services/chat.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class CheckoutComponent {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);
  private chatService = inject(ChatService);
  private destroyRef = inject(DestroyRef);
  private http = inject(HttpClient);

  cart = this.cartService.cart;
  isLoading = signal(false);
  isSuccess = signal(false);
  step = signal<1 | 2>(1);

  form = this.fb.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required]],
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    zipcode: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
    cardExpiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/[0-9]{2}$/)]],
    cardCvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]],
  });

  get f() {
    return this.form.controls;
  }

  constructor() {
    if (!this.cart()) {
      this.cartService.getCart().pipe(takeUntilDestroyed(this.destroyRef)).subscribe();
    }
  }

  nextStep() {
    const fields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'zipcode'];
    const allValid = fields.every((c) => this.form.get(c)?.valid);
    if (allValid) {
      this.step.set(2);
    } else {
      fields.forEach((c) => this.form.get(c)?.markAsTouched());
    }
  }

  placeOrder() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const firstName = this.form.value.firstName!;
    const lastName = this.form.value.lastName!;
    const email = this.form.value.email!;
    const phone = this.form.value.phone!;
    const address = this.form.value.address!;
    const city = this.form.value.city!;
    const total = this.cart()?.total?.price?.current ?? 0;
    const orderId = Math.floor(Math.random() * 90000) + 10000;

    this.cartService
      .checkout()
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.sendN8NNotification(
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            total,
            orderId,
          );
        },
        error: () => {
          this.sendN8NNotification(
            firstName,
            lastName,
            email,
            phone,
            address,
            city,
            total,
            orderId,
          );
        },
      });
  }

  private sendN8NNotification(
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    address: string,
    city: string,
    total: number,
    orderId: number,
  ) {
    console.log('N8N-ზე გაგზავნა, email:', email);

    this.http
      .post('/n8n/webhook/Checkout', {
        firstName,
        lastName,
        email,
        phone,
        address: `${address}, ${city}`,
        city,
        total,
        orderId,
      })
      .pipe(take(1))
      .subscribe({
        next: (res) => console.log('N8N პასუხი:', res),
        error: (err) => console.error('N8N შეცდომა:', err),
      });

    this.chatService
      .sendOrderNotification({
        firstName,
        lastName,
        email,
        phone,
        address: `${address}, ${city}`,
        city,
        total,
      })
      .pipe(take(1))
      .subscribe({
        next: () => {
          this.isLoading.set(false);
          this.isSuccess.set(true);
        },
        error: () => {
          this.isLoading.set(false);
          this.isSuccess.set(true);
        },
      });
  }

  formatCardNumber(event: Event) {
    const v = (event.target as HTMLInputElement).value.replace(/\D/g, '').slice(0, 16);
    this.form.get('cardNumber')?.setValue(v, { emitEvent: false });
  }

  formatExpiry(event: Event) {
    let v = (event.target as HTMLInputElement).value.replace(/\D/g, '');
    if (v.length >= 2) v = v.slice(0, 2) + '/' + v.slice(2, 4);
    this.form.get('cardExpiry')?.setValue(v, { emitEvent: false });
  }
}
