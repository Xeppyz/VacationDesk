import { Routes } from '@angular/router';
import { LoginComponent } from './pages/pages/login/login.component';
import { DashboardComponent } from './pages/pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { UnauthorizedComponent } from './pages/pages/unauthorized/unauthorized.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: '3' }, // Solo administradores
  },
  {
    path: 'superior-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: '2' }, // Solo superiores
  },
  {
    path: 'colaborador-dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { role: '1' }, // Solo colaboradores
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
  },
];
