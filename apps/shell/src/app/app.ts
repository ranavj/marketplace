import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { selectCartCount } from '@marketplace/shared/data-store';
import { Store } from '@ngrx/store';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'shell';
  private store = inject(Store);
  
  // Store se sirf Count maanga
  cartCount= this.store.selectSignal(selectCartCount);
   constructor() {
    console.log('✅ Shell store OK:', this.store);
  }
}
