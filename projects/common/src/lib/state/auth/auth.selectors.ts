import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuth = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const selectIsLoggedIn = createSelector(
  selectAuth,
  (state: AuthState) => state.isLoggedIn
);

export const selectEmail = createSelector(
  selectAuth,
  (state: AuthState) => state.email
);

export const selectName = createSelector(
  selectAuth,
  (state: AuthState) => state.name
);
