import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { AuthService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { GelPipe } from '../../shared/pipes/gel-pipe';
import { signal } from '@angular/core';
import { map, catchError, of } from 'rxjs';
import { LanguageService } from '../../core/services/language';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, GelPipe, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  lang = inject(LanguageService);

  error = signal<string>('');
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('');
  sortBy = signal<string>('popular');

  get searchQueryModel() {
    return this.searchQuery();
  }
  set searchQueryModel(value: string) {
    this.searchQuery.set(value || '');
  }

  get selectedCategoryModel() {
    return this.selectedCategory();
  }
  set selectedCategoryModel(value: string) {
    this.selectedCategory.set(value || '');
  }

  get sortByModel() {
    return this.sortBy();
  }
  set sortByModel(value: string) {
    this.sortBy.set(value || 'popular');
  }

  allProducts = toSignal(
    this.productService.getAll().pipe(
      map((res) => res.products),
      catchError(() => {
        this.error.set(this.lang.translations().error);
        return of([]);
      }),
    ),
    { initialValue: [] as Product[] },
  );

  get filteredProducts(): Product[] {
    let products = this.allProducts();
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    if (query) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.name.toLowerCase().includes(query),
      );
    }

    if (category) {
      products = products.filter((p) => p.category.name === category);
    }

    const sort = this.sortBy();
    if (sort === 'popular') {
      products = [...products].sort((a, b) => b.rating - a.rating);
    } else if (sort === 'price-low') {
      products = [...products].sort((a, b) => a.price.current - b.price.current);
    } else if (sort === 'price-high') {
      products = [...products].sort((a, b) => b.price.current - a.price.current);
    } else if (sort === 'discount') {
      products = [...products].sort(
        (a, b) => b.price.discountPercentage - a.price.discountPercentage,
      );
    }

    return products;
  }

  get categories(): string[] {
    const cats = new Set(this.allProducts().map((p) => p.category.name));
    return Array.from(cats).sort();
  }

  addToCart(product: Product) {
    if (product.stock <= 0) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    const quantity = 1;
    this.cartService.addProduct(product._id, quantity).subscribe({
      next: () => console.log('Product added to cart'),
      error: (err) => console.error('Failed to add product to cart', err),
    });
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
    this.sortBy.set('popular');
  }
}
