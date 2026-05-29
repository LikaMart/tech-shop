import { Component, inject, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { AuthService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { GelPipe } from '../../shared/pipes/gel-pipe';
import { map, catchError, of } from 'rxjs';
import { LanguageService } from '../../core/services/language';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, GelPipe, FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private router = inject(Router);
  lang = inject(LanguageService);

  // ---- სტეიტი ----
  error = signal<string>('');
  searchQuery = signal<string>('');
  selectedCategory = signal<string>('');
  sortBy = signal<string>('popular');
  minPrice = signal<number | null>(null);
  maxPrice = signal<number | null>(null);
  currentPage = signal<number>(1);

  // ---- two-way binding helpers ----
  get searchQueryModel() {
    return this.searchQuery();
  }
  set searchQueryModel(v: string) {
    this.searchQuery.set(v ?? '');
    this.currentPage.set(1);
  }

  get selectedCategoryModel() {
    return this.selectedCategory();
  }
  set selectedCategoryModel(v: string) {
    this.selectedCategory.set(v ?? '');
    this.currentPage.set(1);
  }

  get sortByModel() {
    return this.sortBy();
  }
  set sortByModel(v: string) {
    this.sortBy.set(v ?? 'popular');
  }

  get minPriceModel() {
    return this.minPrice() ?? '';
  }
  set minPriceModel(v: any) {
    const n = v === '' || v === null ? null : Number(v);
    this.minPrice.set(n);
    this.currentPage.set(1);
  }

  get maxPriceModel() {
    return this.maxPrice() ?? '';
  }
  set maxPriceModel(v: any) {
    const n = v === '' || v === null ? null : Number(v);
    this.maxPrice.set(n);
    this.currentPage.set(1);
  }

  // ---- API-დან ჩატვირთვა ----
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

  isLoading = this.productService.isLoading;

  // ---- ფილტრირება  --
  get filteredProducts(): Product[] {
    let products = this.allProducts();
    const query = this.searchQuery().toLowerCase().trim();
    const category = this.selectedCategory();
    const min = this.minPrice();
    const max = this.maxPrice();

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

    if (min !== null) {
      products = products.filter((p) => p.price.current >= min);
    }

    if (max !== null) {
      products = products.filter((p) => p.price.current <= max);
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

  // ---- Pagination ----
  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / PAGE_SIZE);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get paginatedProducts(): Product[] {
    const page = this.currentPage();
    const start = (page - 1) * PAGE_SIZE;
    return this.filteredProducts.slice(start, start + PAGE_SIZE);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ---- კატეგორიების სია ----
  get categories(): string[] {
    const cats = new Set(this.allProducts().map((p) => p.category.name));
    return Array.from(cats).sort();
  }

  // ---- კალათაში დამატება ----
  addToCart(product: Product) {
    if (product.stock <= 0) return;

    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.cartService.addProduct(product._id, 1).subscribe({
      next: () => {
        console.log('Product added to cart');
        this.cartService.getCart().subscribe();
      },
      error: (err) => console.error('Failed to add product to cart', err),
    });
  }

  // ---- ფილტრების გასუფთავება ----
  clearFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
    this.sortBy.set('popular');
    this.minPrice.set(null);
    this.maxPrice.set(null);
    this.currentPage.set(1);
  }

  get hasActiveFilters(): boolean {
    return (
      !!this.searchQuery() ||
      !!this.selectedCategory() ||
      this.minPrice() !== null ||
      this.maxPrice() !== null
    );
  }
}
