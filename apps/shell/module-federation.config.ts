import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'shell',
  remotes: ['discovery', 'checkout'],

  shared: (libraryName, defaultConfig) => {
    const singleton = {
      ...defaultConfig,
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto',
    };

    // ✅ Your shared lib (important to keep single)
    if (libraryName === '@marketplace/shared/data-store') {
      return singleton;
    }

    // ✅ Angular + RxJS must be singleton too (very important)
    if (['@angular/core', '@angular/common', '@angular/router', 'rxjs'].includes(libraryName)) {
      return singleton;
    }

    // ✅ NgRx must be singleton, but NOT eager
    if (['@ngrx/store', '@ngrx/effects', '@ngrx/store-devtools'].includes(libraryName)) {
      return { ...singleton, eager: false };
    }

    return defaultConfig;
  },
};

export default config;
