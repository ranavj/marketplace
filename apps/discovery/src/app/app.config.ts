import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { cartReducer, authReducer } from '@marketplace/shared/data-store';
import { provideStore } from '@ngrx/store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(), 
    provideRouter(appRoutes),
    provideHttpClient(withFetch()), // ✅ Add Provider
    provideStore({
      cart: cartReducer,
      auth: authReducer
    }),
  ],
};
