import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.models';

export const addToCart = createAction(
  '[Cart] Add Item',
  props<{ item: CartItem }>()
);

// Future ke liye (Remove item)
export const removeFromCart = createAction(
  '[Cart] Remove Item',
  props<{ id: string }>()
);