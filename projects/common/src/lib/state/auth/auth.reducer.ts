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

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginSuccess, (state, action) => {
    return {
      ...state,
      isLoggedIn: true,
      token: action.token,
      name: action.name,
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
