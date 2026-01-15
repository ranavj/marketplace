import { createReducer, on } from '@ngrx/store';
import { CartItem } from './cart.models';
import { addToCart, removeFromCart } from './cart.actions';

export interface CartState {
  items: CartItem[];
}

export const initialCartState: CartState = {
  items: [],
};

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { item }) => {
    // Check karo kya item pehle se cart mein hai?
    const existingItem = state.items.find((i) => i.id === item.id);

    if (existingItem) {
      // Agar hai, toh quantity badha do (Immutable way mein)
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };
    }
    // Agar naya hai, toh list mein jod do
    return { ...state, items: [...state.items, item] };
  }),
  
  on(removeFromCart, (state, { id }) => ({
    ...state,
    items: state.items.filter((i) => i.id !== id),
  }))
);