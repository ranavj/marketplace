import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  user: any | null;
  isAuthenticated: boolean;
}

export const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

export const authReducer = createReducer(
  initialState,
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