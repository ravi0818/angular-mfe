import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IProduct } from '../../interface/product';

export const selectCart = createFeatureSelector<IProduct[]>('cart');

export const getCartValue = createSelector(
  selectCart,
  (state: IProduct[]) => state
);
