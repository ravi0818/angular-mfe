import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoggedIn: boolean;
  email: string;
  name: string;
  token: string;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  email: '',
  name: '',
  token: '',
};

// Helper function to safely access sessionStorage
const getStoredUserData = (): AuthState | null => {
  try {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const userData = sessionStorage.getItem('userData');
      if (userData) {
        return JSON.parse(userData) as AuthState;
      }
    }
    return null;
  } catch {
    return null;
  }
};

export const authReducer = createReducer(
  getStoredUserData() || initialAuthState,
  on(AuthActions.loginSuccess, (state: AuthState, action) => {
    const userData = {
      isLoggedIn: true,
      token: action.token,
      name: action.name,
      email: action.email,
    };
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem('userData', JSON.stringify(userData));
      }
    } catch {}
    return userData;
  }),
  on(AuthActions.logout, (state: AuthState) => {
    const userData = {
      isLoggedIn: false,
      token: '',
      name: '',
      email: '',
    };
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.removeItem('userData');
      }
    } catch {}
    return userData;
  })
);
