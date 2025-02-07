import { createReducer, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export const authFeatureKey = 'auth';

export interface AuthState {
  isLoggedIn: boolean;
  email: string;
  token: string;
}

export const initialAuthState: AuthState = {
  isLoggedIn: false,
  email: '',
  token: '',
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      token: action.token,
      username: action.email,
    };
  }),
  on(AuthActions.logout, (state) => {
    return {
      ...state,
      isLoggedIn: false,
      token: '',
      username: '',
    };
  })
);
