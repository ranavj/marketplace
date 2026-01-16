import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CartFacade } from '@marketplace/shared/data-store';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-checkout',
  imports: [CommonModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
  standalone: true
})
export class Checkout {
  private cartFacade = inject(CartFacade);

  // Facade se data signals mein convert kiya
  items = toSignal(this.cartFacade.cartItems$, { initialValue: [] });
  total = toSignal(this.cartFacade.cartTotal$, { initialValue: 0 });

  placeOrder() {
    alert('Integrating Stripe Payment Gateway...');
    // Next step: Stripe logic here
  }
}
