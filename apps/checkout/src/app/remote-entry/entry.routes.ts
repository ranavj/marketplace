import { Route } from '@angular/router';
import { RemoteEntry } from './entry';
import { Checkout } from '../checkout/checkout';
import { CartFacade } from '@marketplace/shared/data-store';

export const remoteRoutes: Route[] = [
    { 
    path: '', 
    component: Checkout, 
    providers: [CartFacade]    
  }
];
