import { Component, inject } from '@angular/core';
import { LanguageService } from '../../../core/services/language';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  lang = inject(LanguageService);
}
