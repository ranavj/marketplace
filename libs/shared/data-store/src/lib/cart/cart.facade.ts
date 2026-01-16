import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
// ✅ Updated Imports: Naye selectors add kiye
import { selectCartCount, selectCartItems, selectCartTotal } from './cart.selectors';
import { addToCart } from './cart.actions';
import { CartItem } from './cart.models';

@Injectable() 
export class CartFacade {
  // Facade internal implementation ke liye Store use karega
  private store = inject(Store);

  // Data Streams
  cartCount$ = this.store.select(selectCartCount);

  // ✅ NEW: Items List Stream
  cartItems$ = this.store.select(selectCartItems);

  // ✅ NEW: Total Price Stream
  cartTotal$ = this.store.select(selectCartTotal);

  // Methods
  addItem(item: CartItem) {
    this.store.dispatch(addToCart({ item }));
  }
}