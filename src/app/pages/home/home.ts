import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ProductService, Product } from '../../core/services/product';
import { CartService } from '../../core/services/cart';
import { RouterLink } from '@angular/router';
import { GelPipe } from '../../shared/pipes/gel-pipe';
import { signal } from '@angular/core';
import { map, catchError, of } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, GelPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  error = signal<string>('');

  products = toSignal(
    this.productService.getAll().pipe(
      map((res) => res.products),
      catchError(() => {
        this.error.set('პროდუქტები ვერ ჩაიტვირთა');
        return of([]);
      }),
    ),
    { initialValue: [] as Product[] },
  );

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
}
