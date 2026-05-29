import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, of } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  time: Date;
}

export interface ChatResponse {
  reply: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);

  private webhookUrl = 'https://likamart.app.n8n.cloud/webhook/techshop-chat';
  private productsUrl = 'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=20';

  sendMessage(message: string): Observable<ChatResponse> {
    // პირველ ნაბიჯად პროდუქტებს წამოვიღებთ API-დან
    return this.http.get<any>(this.productsUrl).pipe(
      switchMap((productsData) => {
        // პროდუქტების მოკლე სია AI-სთვის
        const productsSummary = productsData.products
          .slice(0, 15)
          .map((p: any) =>
            `${p.title} | ბრენდი: ${p.brand} | ფასი: ${p.price.current}₾ | კატეგორია: ${p.category.name} | შეფასება: ${p.rating}`
          )
          .join('\n');

        return this.http.post<ChatResponse>(this.webhookUrl, {
          type: 'chat',
          message,
          productsContext: productsSummary,
        });
      })
    );
  }

  sendContactForm(data: {
    name: string;
    email: string;
    message: string;
  }): Observable<any> {
    return this.http.post(this.webhookUrl, {
      type: 'contact',
      ...data,
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
