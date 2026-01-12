import { NxWelcome } from './nx-welcome';
import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'checkout',
    loadChildren: () => import('checkout/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: 'discovery',
    loadChildren: () => import('discovery/Routes').then((m) => m!.remoteRoutes),
  },
  {
    path: '',
    component: NxWelcome,
  },
];
