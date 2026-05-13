import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { RouterLink } from '@angular/router';
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
  lang = inject(LanguageService);

  error = signal<string>('');
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('');
  sortBy = signal<string>('popular');

  allProducts = toSignal(
    this.productService.getAll().pipe(
      map((res) => res.products),
      catchError(() => {
        this.error.set('პროდუქტები ვერ ჩაიტვირთა');
        return of([]);
      }),
    ),
    { initialValue: [] as Product[] },
  );

  get filteredProducts(): Product[] {
    let products = this.allProducts();
    const query = this.searchQuery().toLowerCase();
    const category = this.selectedCategory();

    // Apply search filter
    if (query) {
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.brand.toLowerCase().includes(query) ||
          p.category.name.toLowerCase().includes(query),
      );
    }

    // Apply category filter
    if (category) {
      products = products.filter((p) => p.category.name === category);
    }

    // Apply sorting
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
    const categories = new Set(this.allProducts().map((p) => p.category.name));
    return Array.from(categories).sort();
  }

  addToCart(product: Product) {
    this.cartService.updateCart(product._id).subscribe({
      next: () => {
        console.log('კალათა განახლდა');
      },
      error: () => {
        this.cartService.createCart(product._id).subscribe();
      },
    });
  }

  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
    this.sortBy.set('popular');
  }
}
