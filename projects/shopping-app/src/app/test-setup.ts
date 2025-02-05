import { provideZoneChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { cartReducer } from 'common';

export async function setupTestBed(config: any) {
  TestBed.configureTestingModule({
    ...config,
    providers: [
      ...(config.providers || []),
      provideZoneChangeDetection({ eventCoalescing: true }),
      provideRouter(routes),
      provideAnimationsAsync(),
      provideHttpClient(),
      provideNativeDateAdapter(),
      provideStore({ cart: cartReducer }),
    ],
  }).compileComponents();
}
