import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart';
import { ProductService, Product } from '../../core/services/product';
import { GelPipe } from '../../shared/pipes/gel-pipe';
import { Router, RouterLink } from '@angular/router';
import { LanguageService } from '../../core/services/language';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [GelPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent implements OnInit {
  cartService = inject(CartService);
  productService = inject(ProductService);
  lang = inject(LanguageService);
  private router = inject(Router);

  productMap: Record<string, Product> = {};

  ngOnInit() {
    this.cartService.getCart().subscribe(() => {
      const products = this.cartService.cart()?.products ?? [];
      products.forEach(item => {
        this.productService.getById(item.productId).subscribe(product => {
          this.productMap[item.productId] = product;
        });
      });
    });
  }

  removeItem(productId: string) {
    this.cartService.deleteItem(productId).subscribe();
  }

  clear() {
    this.cartService.clearCart().subscribe();
  }

  doCheckout() {
    this.router.navigate(['/checkout']);
  }
}
