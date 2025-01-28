import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
// import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, RouterLink, MatBadgeModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private routerSubscription!: Subscription;
  // productsService = inject(ProductsService);
  router = inject(Router);
  // cartItems = computed(() => this.productsService.cart());
  cartItems = signal([]);
  currentRoute = signal(this.router.url);
  isMenuOpen = signal(false);

  constructor() {}

  ngOnInit(): void {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMenuOpen.set(false);
        this.currentRoute.set(this.router.url);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  toggleMenu(): void {
    this.isMenuOpen.update((value) => !value);
  }
}
