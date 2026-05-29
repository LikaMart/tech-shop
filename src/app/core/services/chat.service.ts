import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  time: Date;
}

export interface ChatResponse {
  reply: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);

  private webhookUrl = 'https://likamart.app.n8n.cloud/webhook/techshop-chat';

  sendMessage(message: string): Observable<ChatResponse> {
    return this.http.post<ChatResponse>(this.webhookUrl, {
      type: 'chat',
      message,
    });
  }

  sendContactForm(data: ContactFormData): Observable<any> {
    return this.http.post(this.webhookUrl, {
      type: 'contact',
      name: data.name,
      email: data.email,
      message: data.message,
    });
  }

  sendOrderNotification(orderData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    total: number;
  }): Observable<any> {
    return this.http.post(this.webhookUrl, {
      type: 'order',
      ...orderData,
    });
  }
}
