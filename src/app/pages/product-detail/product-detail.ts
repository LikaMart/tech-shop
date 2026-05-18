import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { LanguageService } from '../../core/services/language';
import { GelPipe } from '../../shared/pipes/gel-pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, GelPipe, FormsModule],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  lang = inject(LanguageService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string>('');
  quantity = signal(1);
  selectedImage = signal<string>('');
  addedToCart = signal(false);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProduct(id);
    }
  }

  loadProduct(id: string) {
    this.loading.set(true);
    this.productService.getById(id).subscribe({
      next: (product) => {
        this.product.set(product);
        this.selectedImage.set(product.thumbnail);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.lang.translations().failedToLoadProduct);
        this.loading.set(false);
      },
    });
  }

  incrementQuantity() {
    this.quantity.update((q) => q + 1);
  }

  decrementQuantity() {
    if (this.quantity() > 1) {
      this.quantity.update((q) => q - 1);
    }
  }

  addToCart() {
    const currentProduct = this.product();
    if (!currentProduct) return;

    this.cartService.updateCart(currentProduct._id).subscribe({
      next: () => {
        this.addedToCart.set(true);
        setTimeout(() => this.addedToCart.set(false), 2000);
      },
      error: () => {
        this.cartService.createCart(currentProduct._id).subscribe({
          next: () => {
            this.addedToCart.set(true);
            setTimeout(() => this.addedToCart.set(false), 2000);
          },
        });
      },
    });
  }
}
