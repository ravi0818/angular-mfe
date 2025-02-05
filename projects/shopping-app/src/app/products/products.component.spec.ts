import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { setupTestBed } from '../test-setup';
import { ProductsService } from '../services/products.service';
import { of, throwError } from 'rxjs';
import { Store } from '@ngrx/store';

const mockProducts = [
  {
    id: 1,
    title: 'Product 1',
    price: 10,
    description: 'Description 1',
    category: 'Category 1',
    image: 'image1.jpg',
    rating: { rate: 4.5, count: 10 },
  },
  {
    id: 2,
    title: 'Product 2',
    price: 20,
    description: 'Description 2',
    category: 'Category 2',
    image: 'image2.jpg',
    rating: { rate: 3.8, count: 15 },
  },
];

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: jasmine.SpyObj<ProductsService>;
  let store: Store;

  beforeEach(async () => {
    await setupTestBed({
      imports: [ProductsComponent],
    });
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
    store = TestBed.inject(Store);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all products', () => {
    spyOn(productService, 'getAllProducts').and.returnValue(of(mockProducts));
    component.ngOnInit();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
  });

  it('should handle error if load all products fails', () => {
    spyOn(productService, 'getAllProducts').and.returnValue(
      throwError(() => new Error('Something went wrong!'))
    );
    spyOn(console, 'error');
    component.ngOnInit();

    expect(productService.getAllProducts).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();
  });

  it('should open alert dialog if product is already in cart', () => {
    spyOn(component, 'openDialog').and.callThrough();

    component.cart$ = of(mockProducts);
    component.handleBuy(mockProducts[0]);

    fixture.detectChanges();

    expect(component.openDialog).toHaveBeenCalled();
  });

  it('should add product to cart if product is not in cart', () => {
    spyOn(component, 'openDialog').and.callThrough();
    spyOn(store, 'dispatch');

    component.cart$ = of([]);
    component.handleBuy(mockProducts[0]);

    fixture.detectChanges();

    expect(component.openDialog).not.toHaveBeenCalled();
    expect(store.dispatch).toHaveBeenCalled();
  });
});
