import { ApplicationConfig, isDevMode, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { authReducer } from './+state/auth/auth.reducer';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideHttpClient(withFetch()),
    // 👇 NgRx Global Store Setup
    provideStore({
      auth: authReducer // Auth feature register kiya
    }),
    provideEffects([]), // Abhi effects khali hain
    
    // 👇 DevTools (Browser Extension ke liye)
    provideStoreDevtools({ 
      maxAge: 25, 
      logOnly: !isDevMode() 
    }),
  ],
};