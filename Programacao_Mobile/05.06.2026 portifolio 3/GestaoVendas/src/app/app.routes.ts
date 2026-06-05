import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register-user',
    loadComponent: () => import('./pages/register-user/register-user.page').then( m => m.RegisterUserPage)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./pages/dashboard/dashboard.page').then( m => m.DashboardPage)
  },
  {
    path: 'register-product',
    loadComponent: () => import('./pages/register-product/register-product.page').then( m => m.RegisterProductPage)
  },
  {
    path: 'register-client',
    loadComponent: () => import('./pages/register-client/register-client.page').then( m => m.RegisterClientPage)
  },
  {
    path: 'sale',
    loadComponent: () => import('./pages/sale/sale.page').then( m => m.SalePage)
  },
  {
    path: 'receivables',
    loadComponent: () => import('./pages/receivables/receivables.page').then( m => m.ReceivablesPage)
  }
];
