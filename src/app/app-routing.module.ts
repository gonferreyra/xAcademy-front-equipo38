import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthJwtGuard } from './core/guards/auth-jwt.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
    //canActivate:[AuthJwtGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () => import('./modules/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'create',
    loadChildren: () => import('./modules/create-cv/create-cv.module').then(m => m.CreateCvModule),
  },
  {
    path: 'cv',
    loadChildren: () => import('./modules/generate-cv/generate-cv.module').then(m => m.GenerateCvModule),
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
