import { createAction, props } from '@ngrx/store';
import { IProduct } from '../interface/product';

export const addItemToCart = createAction(
  '[Cart] Add Item to Cart',
  props<{ product: IProduct }>()
);

export const removeItemFromCart = createAction(
  '[Cart] Remove Item from Cart',
  props<{ product: IProduct }>()
);
