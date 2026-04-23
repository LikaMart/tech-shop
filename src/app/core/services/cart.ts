import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class Cartservice {
  items = signal<CartItem[]>([]);

  totalprice = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price.current * item.quantity, 0),
  );

  addToCart(product: Product) {
    const current = this.items();
    const existing = current.find((i) => i.product._id === product._id);

    if (existing) {
      this.items.set(
        current.map((i) =>
          i.product._id === product._id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      );
    } else {
      this.items.set([...current, { product, quantity: 1 }]);
    }
  }

  removeFromCart(productId: string) {
    this.items.set(this.items().filter((i) => i.product._id !== productId));
  }

  clearCart() {
    this.items.set([]);
  }
}
