import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

// 'cart' naam se state uthao
export const selectCartState = createFeatureSelector<CartState>('cart');

// Total Items count karo (Qty jod kar)
export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.items.reduce((total, item) => total + item.quantity, 0)
);