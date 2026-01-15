import { Route } from '@angular/router';
import { ProductList } from '../product-list/product-list';

export const remoteRoutes: Route[] = [
    {
        path: '',
        component: ProductList
    }
];
