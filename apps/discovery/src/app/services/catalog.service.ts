import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
}

@Injectable({ providedIn: 'root' })
export class CatalogService {
  private http = inject(HttpClient);
  // Gateway URL (Port 8000)
  private apiUrl = `${environment.apiUrl}/products`;
  getProducts() {
    return this.http.get<{ products: Product[] }>(this.apiUrl).pipe(
      map(response => response.products.map(p => ({
        ...p,
        // Har product ke liye ek random image generate kar rahe hain UI ke liye
        image: `https://picsum.photos/seed/${p.id}/400/300` 
      })))
    );
  }
}