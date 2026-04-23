import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  products = signal<Product[]>([]);
  isLoading = signal<boolean>(false);

  ngOnInit() {
    this.isLoading.set(true);
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products.set(res.products);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
      }
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }
}
