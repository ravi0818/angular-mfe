import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from './../environments/environment';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'todos',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: `${environment.mfes?.todosApp}/remoteEntry.js`,
        exposedModule: './Component',
      }).then((m) => m.AppComponent),
  },
];
