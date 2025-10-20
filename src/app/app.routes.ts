import { Routes } from '@angular/router';
import { authGuard, loginGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    canActivate: [loginGuard]
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./layout/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'busqueda',
        loadComponent: () => import('./features/busqueda/busqueda.component').then(m => m.BusquedaComponent)
      },
      {
        path: 'feature1',
        loadComponent: () => import('./features/feature1/feature1.component').then(m => m.Feature1Component)
      },
      {
        path: 'feature1/opcion1',
        loadComponent: () => import('./features/feature1/opcion1/opcion1.component').then(m => m.Opcion1Component)
      },
      {
        path: 'feature1/opcion2',
        loadComponent: () => import('./features/feature1/opcion2/opcion2.component').then(m => m.Opcion2Component)
      },
      {
        path: 'feature1/opcion3',
        loadComponent: () => import('./features/feature1/opcion3/opcion3.component').then(m => m.Opcion3Component)
      },
      {
        path: 'feature2',
        loadComponent: () => import('./features/feature2/feature2.component').then(m => m.Feature2Component)
      },
      {
        path: 'feature3',
        loadComponent: () => import('./features/feature3/feature3.component').then(m => m.Feature3Component)
      },
      {
        path: 'busqueda-garra',
        loadComponent: () => import('./features/busqueda-garra/busqueda-garra.component').then(m => m.BusquedaGarraComponent)
      },
      {
        path: 'feature4',
        loadComponent: () => import('./features/feature4/feature4.component').then(m => m.Feature4Component)
      },
      {
        path: '',
        redirectTo: 'busqueda',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];
