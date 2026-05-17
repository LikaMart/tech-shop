import { Component, inject, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../../core/services/language';
import { GelPipe } from '../../pipes/gel-pipe';
import { Product } from '../../../core/services/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, GelPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCardComponent {
  lang = inject(LanguageService);

  @Input() product!: Product;
  @Output() addToCart = new EventEmitter<Product>();

  onAddToCart() {
    this.addToCart.emit(this.product);
  }
}