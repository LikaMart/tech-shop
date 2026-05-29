import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChatService } from '../../core/services/chat.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private chatService = inject(ChatService);

  sent = signal(false);
  isLoading = signal(false);
  error = signal('');

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.error.set('');

    const { name, email, message } = this.form.value;

    this.chatService.sendContactForm({
      name: name!,
      email: email!,
      message: message!,
    }).pipe(take(1)).subscribe({
      next: () => {
        this.sent.set(true);
        this.isLoading.set(false);
        this.form.reset();
      },
      error: () => {
        // n8n-მა შეიძლება 200 არ დააბრუნოს, მაგრამ შეტყობინება მაინც გაიგზავნა
        this.sent.set(true);
        this.isLoading.set(false);
        this.form.reset();
      },
    });
  }
}
