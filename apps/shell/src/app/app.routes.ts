import { Route } from '@angular/router';
import { Login } from './login/login';

export const appRoutes: Route[] = [
  { path: 'login', component: Login }, // 👈 New Route
  {
    path: 'checkout',
    loadChildren: () => import('checkout/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'discovery',
    loadChildren: () => import('discovery/Routes').then((m) => m!.remoteRoutes),
  }
];
