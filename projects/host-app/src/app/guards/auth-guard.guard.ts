import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsLoggedIn, selectToken } from 'common';
import { firstValueFrom } from 'rxjs';

export const authGuardGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  const token = await firstValueFrom(store.select(selectToken));
  const isLoggedIn = await firstValueFrom(store.select(selectIsLoggedIn));

  const protectedRoutes = ['/', '/todos', '/shopping'];

  if (!protectedRoutes.includes(state.url)) return true;
  if (isLoggedIn && token) return true;

  return router.navigate(['/login']);
};
