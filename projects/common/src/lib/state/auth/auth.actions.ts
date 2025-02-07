import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Login Success': props<{ email: string; token: string }>(),
    'Login Failure': props<{ error: unknown }>(),
    Logout: emptyProps(),
  },
});
