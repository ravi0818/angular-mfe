import { createReducer, on } from '@ngrx/store';
import * as PostsActions from './cart.actions';
import { IProduct } from '../../interface/product';

export const initialState: IProduct[] = [];

export const cartReducer = createReducer(
  initialState,
  on(PostsActions.addItemToCart, (state, action) => {
    state = [...state, action.product];

    return state;
  }),
  on(PostsActions.removeItemFromCart, (state, action) => {
    const index = state.findIndex(
      (product) => product.id === action.product.id
    );
    state.splice(index, 1);

    return state;
  })
);
