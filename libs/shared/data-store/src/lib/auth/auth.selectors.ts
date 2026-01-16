import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.models';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

// ✅ UPDATE: Direct state property use karein, calculation ki zaroorat nahi
export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectToken = createSelector(
  selectAuthState,
  (state) => state.token
);