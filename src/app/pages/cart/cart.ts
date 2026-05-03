import { Component, inject, OnInit } from '@angular/core';
import { CartService, CartResponse } from '../../core/services/cart';
import { GelPipe } from '../../shared/pipes/gel-pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [GelPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);

  ngOnInit() {
    this.cartService.getCart().subscribe();
  }

  removeItem(productId: string) {
    this.cartService.deleteItem(productId).subscribe();
  }

  clear() {
    this.cartService.clearCart().subscribe();
  }

  doCheckout() {
    this.cartService.checkout().subscribe();
  }
}
