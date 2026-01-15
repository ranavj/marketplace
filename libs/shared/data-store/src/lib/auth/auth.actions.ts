import { createAction, props } from '@ngrx/store';

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; user: any }>()
);

export const logout = createAction('[Auth] Logout');

export const initAuth = createAction('[Auth] Init'); // App start hone par check karne ke liye