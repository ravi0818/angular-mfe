import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from './../environments/environment';
import { authGuardGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuardGuard],
  },
  {
    path: 'todos',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.mfes?.todosApp}/remoteEntry.js`,
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
    canActivate: [authGuardGuard],
  },
  {
    path: 'shopping',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.mfes?.shoppingApp}/remoteEntry.js`,
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
    canActivate: [authGuardGuard],
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
    canActivate: [authGuardGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
    canActivate: [authGuardGuard],
  },
];
