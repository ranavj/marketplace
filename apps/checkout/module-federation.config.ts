import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'checkout',
  
  exposes: {
    './Routes': 'apps/checkout/src/app/remote-entry/entry.routes.ts',
  },

  // 👇 YEH LOGIC ADD KAREIN (Shell jaisa same hona chahiye)
  shared: (libraryName, defaultConfig) => {
    
    // 1. Apni Data Store Library
    if (libraryName === '@marketplace/shared/data-store') {
      return { 
        ...defaultConfig, 
        singleton: true, 
        strictVersion: false, 
        requiredVersion: 'auto',
        eager: true 
      };
    }

    // 2. Angular Core (Zaroori hai taaki Signals work karein)
    if (['@angular/core', '@angular/common', '@angular/router'].includes(libraryName)) {
      return { 
        ...defaultConfig, 
        singleton: true, 
        strictVersion: false, 
        requiredVersion: 'auto',
        eager: true 
      };
    }

    // 3. NgRx (State Management)
    if (['@ngrx/store', '@ngrx/effects', '@ngrx/store-devtools'].includes(libraryName)) {
      return { 
        ...defaultConfig, 
        singleton: true, 
        strictVersion: false, 
        requiredVersion: 'auto',
        eager: true 
      };
    }

    return defaultConfig;
  },
};

export default config;