import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router, NavigationStart } from '@angular/router';
import { AuthService } from '../../../core/services/auth';
import { CartService } from '../../../core/services/cart';
import { LanguageService } from '../../../core/services/language';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class NavbarComponent {
  auth = inject(AuthService);
  cart = inject(CartService);
  lang = inject(LanguageService);
  private router = inject(Router);

  isMenuOpen = signal(false);

  constructor() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart)
    ).subscribe(() => this.closeMenu());
  }

  toggleMenu() {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
