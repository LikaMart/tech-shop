import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

export interface CartProduct {
  quantity: number;
  pricePerQuantity: number;
  beforeDiscountPrice: number;
  productId: string;
}

export interface CartResponse {
  _id: string;
  userId: string;
  createdAt: string;
  total: {
    price: {
      current: number;
      beforeDiscount: number;
    };
    quantity: number;
    products: number;
  };
  products: CartProduct[];
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.everrest.educata.dev/shop/cart';

  cart = signal<CartResponse | null>(null);
  totalItems = signal<number>(0);

  getCart() {
    return this.http.get<CartResponse>(this.apiUrl).pipe(
      tap((res) => {
        this.cart.set(res);
        this.totalItems.set(res.total.quantity);
      }),
    );
  }

  createCart(productId: string, quantity: number = 1) {
    return this.http
      .post<CartResponse>(`${this.apiUrl}/product`, {
        id: productId,
        quantity,
      })
      .pipe(
        tap((res) => {
          this.cart.set(res);
          this.totalItems.set(res.total.quantity);
        }),
      );
  }

  updateCart(productId: string, quantity: number = 1) {
    return this.http
      .patch<CartResponse>(`${this.apiUrl}/product`, {
        id: productId,
        quantity,
      })
      .pipe(
        tap((res) => {
          this.cart.set(res);
          this.totalItems.set(res.total.quantity);
        }),
      );
  }

  deleteItem(productId: string) {
    return this.http
      .delete<CartResponse>(`${this.apiUrl}/product`, {
        body: { id: productId },
      })
      .pipe(
        tap((res) => {
          this.cart.set(res);
          this.totalItems.set(res.total.quantity);
        }),
      );
  }

  clearCart() {
    return this.http.delete<{ success: boolean }>(this.apiUrl).pipe(
      tap(() => {
        this.cart.set(null);
        this.totalItems.set(0);
      }),
    );
  }

  checkout() {
    return this.http
      .post<{ success: boolean; message: string }>(`${this.apiUrl}/checkout`, {})
      .pipe(
        tap(() => {
          this.cart.set(null);
          this.totalItems.set(0);
        }),
      );
  }
}
