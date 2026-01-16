import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions'; 
import { selectUser, selectIsLoggedIn } from './auth.selectors'; 

@Injectable() 
export class AuthFacade {
  private store = inject(Store);

  user$ = this.store.select(selectUser);
  isLoggedIn$ = this.store.select(selectIsLoggedIn);

  setLoginSuccess(token: string, user: any) {
    this.store.dispatch(loginSuccess({ token, user }));
  }

  logout() {
    this.store.dispatch(logout());
  }
}