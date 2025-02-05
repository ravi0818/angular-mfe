import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { setupTestBed } from '../test-setup';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    setupTestBed({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get products', (done) => {
    service.getAllProducts().subscribe({
      next: (products) => {
        expect(products).toBeTruthy();
        expect(products.length).toBeGreaterThan(0);
        done();
      },
      error: (error) => {
        done.fail(error);
      },
    });
  });
});
