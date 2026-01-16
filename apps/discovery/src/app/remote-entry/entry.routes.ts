import { Route } from '@angular/router';
import { ProductList } from '../product-list/product-list';
import { CartFacade } from '@marketplace/shared/data-store';

export const remoteRoutes: Route[] = [
    {
        path: '',
        component: ProductList,
        providers: [CartFacade]
    }
];
