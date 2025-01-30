import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { getCartValue, IProduct } from 'common';
import { Store } from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
// import { ProductsService } from '@services/products.service';

@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    RouterLink,
    MatBadgeModule,
    MatIconModule,
    AsyncPipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private routerSubscription!: Subscription;
  router = inject(Router);
  store = inject(Store);
  cart$: Observable<IProduct[]>;
  cartCount$: Observable<number>;
  currentRoute = signal(this.router.url);
  isMenuOpen = signal(false);

  constructor() {
    this.cart$ = this.store.select(getCartValue);
    this.cartCount$ = this.cart$.pipe(map((cart) => cart.length));
  }

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
