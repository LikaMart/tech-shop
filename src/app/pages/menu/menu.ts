import { Component, inject, signal, OnInit, DestroyRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product, Category } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs';
import { HighlightDirective } from '../../shared/directives/highlight.directive';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, FormsModule, HighlightDirective],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class MenuComponent implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private destroyRef = inject(DestroyRef);

  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal(true);
  error = signal('');
  addedId = signal<number | null>(null);
  selectedCategoryId = signal<number | null>(null);
  searchQuery = signal('');

  private search$ = new Subject<string>();

  ngOnInit() {
    this.productService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((cats) => this.categories.set(cats));

    this.productService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (products) => {
          this.products.set(products);
          this.isLoading.set(false);
        },
        error: () => {
          this.error.set('მენიუ ვერ ჩაიტვირთა');
          this.isLoading.set(false);
        },
      });

    this.search$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((query) =>
          this.productService.getAll().pipe(
            map((products) =>
              products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase())),
            ),
          ),
        ),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((products) => this.products.set(products));
  }

  onSearch(query: string) {
    this.searchQuery.set(query);
    this.search$.next(query);
  }

  filterByCategory(id: number | null) {
    this.selectedCategoryId.set(id);
    if (id === null) {
      this.productService
        .getAll()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((p) => this.products.set(p));
    } else {
      this.productService
        .getByCategory(id)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((p) => this.products.set(p));
    }
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.addedId.set(product.id);
    setTimeout(() => this.addedId.set(null), 1500);
  }
}
