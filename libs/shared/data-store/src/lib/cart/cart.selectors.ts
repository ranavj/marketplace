import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

// 'cart' naam se state uthao
export const selectCartState = createFeatureSelector<CartState>('cart');

// ✅ NEW: Sare Items ki list uthao (Checkout page par dikhane ke liye)
export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.items
);

// ✅ NEW: Total Price calculate karo (Price * Quantity)
export const selectCartTotal = createSelector(
  selectCartState,
  (state) => state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
);

// Total Items count karo (Qty jod kar)
export const selectCartCount = createSelector(
  selectCartState,
  (state) => state.items.reduce((total, item) => total + item.quantity, 0)
);