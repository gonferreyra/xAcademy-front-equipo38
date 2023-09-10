import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthJwtGuard } from './core/guards/auth-jwt.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate:[AuthJwtGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'cursos',
    loadChildren: () => import('./modules/cursos/cursos.module').then(m => m.CursosModule),
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
