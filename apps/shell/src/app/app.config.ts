import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { authReducer, cartReducer } from '@marketplace/shared/data-store';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
   
    
    provideStore({
      auth: authReducer, // Auth State
      cart: cartReducer  // Cart State (Naya)
    }),
    provideEffects([]), // Abhi effects khali hain
    // 👇 DevTools (Browser Extension ke liye)
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    }),
  ],
};