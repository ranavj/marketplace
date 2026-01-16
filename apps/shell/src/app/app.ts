import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop'; // 👈 Signal conversion ke liye
import { CartFacade } from '@marketplace/shared/data-store'; // 👈 Store ki jagah Facade

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  providers: [CartFacade] 
})
export class App {
  protected title = 'shell';
  
  // 1. Facade Inject karein
  private cartFacade = inject(CartFacade);

  // 2. Facade ke Observable ko Signal mein convert karein
  // { initialValue: 0 } zaroori hai taaki template mein error na aaye
  cartCount = toSignal(this.cartFacade.cartCount$, { initialValue: 0 });

  constructor() {
    // Debugging updated: Ab Facade check kar sakte hain
    (window as any).shellFacade = this.cartFacade;
    console.log('✅ Shell Facade Attached to window.shellFacade');
  }
}