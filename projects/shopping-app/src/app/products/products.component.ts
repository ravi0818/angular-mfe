import { CommonModule } from '@angular/common';
import {
  Component,
  inject,
  signal,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  addItemToCart,
  AlertDialogComponent,
  getCartValue,
  IProduct,
  TableComponent,
} from 'common';
import { MatDialog } from '@angular/material/dialog';
import { ProductsService } from '../services/products.service';
import { Observable, take } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-products',
  imports: [FormsModule, TableComponent, CommonModule, MatButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  productsService = inject(ProductsService);
  store = inject(Store);
  cart$: Observable<IProduct[]>;
  columns = [
    'id',
    'image',
    'title',
    'price',
    'description',
    'category',
    'action',
  ];
  isLoading = signal(false);
  products!: IProduct[];

  @ViewChild('actionTemplate')
  actionTemplate!: TemplateRef<any>;

  @ViewChild('imageTemplate')
  imageTemplate!: TemplateRef<any>;

  constructor() {
    this.cart$ = this.store.select(getCartValue);
    console.log('inside constructor');
  }

  ngOnInit() {
    this.isLoading.set(true);
    this.productsService.getAllProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.isLoading.set(false);
      },
    });
  }

  get customTemplates() {
    return {
      action: this.actionTemplate,
      image: this.imageTemplate,
    };
  }

  dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(AlertDialogComponent, {
      data: {
        title: 'Alert',
        message: 'This item is already in the cart!',
      },
    });
  }

  handleBuy(product: IProduct) {
    this.cart$.pipe(take(1)).subscribe((cart) => {
      const isDuplicate = cart.some((item) => item.id === product.id);
      console.log({ cart, isDuplicate });
      if (isDuplicate) {
        this.openDialog();
      } else {
        this.store.dispatch(addItemToCart({ product }));
      }
    });
  }
}
