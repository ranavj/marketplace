import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';
import { AuthState } from './auth.models';

export const initialAuthState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialAuthState,
  on(loginSuccess, (state, { token, user }) => ({
    ...state,
    token,
    user,
    isAuthenticated: true,
  })),
  on(logout, (state) => ({
    ...state,
    token: null,
    user: null,
    isAuthenticated: false,
  }))
);