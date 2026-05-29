import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map, of, catchError } from 'rxjs';

export interface ChatMessage {
  role: 'user' | 'bot';
  text: string;
  time: Date;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private http = inject(HttpClient);

  private webhookUrl =
    'https://likamart.app.n8n.cloud/webhook/dd8afe36-7703-49e6-9524-e7e94eb8bca0/chat';
  private productsUrl =
    'https://api.everrest.educata.dev/shop/products/all?page_index=1&page_size=20';

  sendMessage(message: string): Observable<string> {
    return this.http.get<any>(this.productsUrl).pipe(
      catchError(() => of({ products: [] })),
      switchMap((productsData) => {
        const productsSummary = this.buildProductsSummary(productsData);

        return this.http.post<any>(this.webhookUrl, {
          type: 'chat',
          message,
          text: message,
          productsContext: productsSummary,
          productsSummary,
        });
      }),
      map((response) => this.parseChatReply(response)),
    );
  }

  sendContactForm(data: { name: string; email: string; message: string }): Observable<any> {
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

  private buildProductsSummary(productsData: any): string {
    if (!productsData?.products || !Array.isArray(productsData.products)) {
      return '';
    }

    return productsData.products
      .slice(0, 15)
      .map(
        (p: any) =>
          `${p.title} | ბრენდი: ${p.brand} | ფასი: ${p.price?.current ?? 'N/A'}₾ | კატეგორია: ${p.category?.name ?? 'Არ არის'} | შეფასება: ${p.rating ?? '0'}`,
      )
      .join('\n');
  }

  private parseChatReply(response: any): string {
    const reply = this.findReplyText(response);
    return reply ?? '';
  }

  private findReplyText(value: any): string | undefined {
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed) {
        return trimmed;
      }
      return undefined;
    }

    if (Array.isArray(value)) {
      for (const item of value) {
        const reply = this.findReplyText(item);
        if (reply) {
          return reply;
        }
      }
      return undefined;
    }

    if (value && typeof value === 'object') {
      const keys = [
        'reply',
        'response',
        'answer',
        'message',
        'text',
        'result',
        'output',
        'outputText',
        'body',
        'data',
        'json',
      ];

      for (const key of keys) {
        if (key in value) {
          const reply = this.findReplyText(value[key]);
          if (reply) {
            return reply;
          }
        }
      }

      const stringValues = Object.values(value).filter(
        (item) => typeof item === 'string' && item.trim(),
      ) as string[];
      if (stringValues.length === 1) {
        return stringValues[0].trim();
      }

      for (const item of Object.values(value)) {
        const reply = this.findReplyText(item);
        if (reply) {
          return reply;
        }
      }
    }

    return undefined;
  }
}
