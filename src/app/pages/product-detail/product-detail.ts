import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { AuthService } from '../../core/services/auth';
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
  private router = inject(Router);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  lang = inject(LanguageService);

  product = signal<Product | null>(null);
  loading = signal(true);
  error = signal<string>('');
  quantity = signal<number>(1);
  selectedImage = signal<string>('');
  addedToCart = signal(false);

  get quantityModel() {
    return this.quantity();
  }
  set quantityModel(value: number) {
    const requested = Number(value) || 1;
    const stock = this.product()?.stock ?? 1;
    this.quantity.set(Math.max(1, Math.min(requested, stock)));
  }

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
        this.quantity.set(1);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(this.lang.translations().failedToLoadProduct);
        this.loading.set(false);
      },
    });
  }

  incrementQuantity() {
    const product = this.product();
    if (!product || product.stock <= 0) return;
    this.quantity.update((q) => Math.min(q + 1, product.stock));
  }

  decrementQuantity() {
    this.quantity.update((q) => Math.max(1, q - 1));
  }

  addToCart() {
    const currentProduct = this.product();
    if (!currentProduct || currentProduct.stock <= 0) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const quantity = this.quantity();
    this.cartService.addProduct(currentProduct._id, quantity).subscribe({
      next: () => {
        this.addedToCart.set(true);
        setTimeout(() => this.addedToCart.set(false), 2000);
      },
      error: (err) => console.error('Failed to add product to cart', err),
    });
  }
}
