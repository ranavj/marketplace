import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Product, CatalogService } from '../services/catalog.service';
import { Store } from '@ngrx/store';
import { addToCart } from '@marketplace/shared/data-store';
@Component({
  selector: 'app-product-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products = signal<Product[]>([]);
  loading = signal<boolean>(true);
  
  private catalogService = inject(CatalogService);
  private store = inject(Store); // ✅ Store Inject
  ngOnInit() {
    console.log('Store identity', this.store);

    this.catalogService.getProducts().subscribe({
      next: (data) => {
        this.products.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Failed to load products', err);
        this.loading.set(false);
      }
    });
  }

  addItem(product: Product) {
    console.log('Dispatching Add to Cart:', product.name);
    
    this.store.dispatch(addToCart({
      item: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }
    }));
  }
}
