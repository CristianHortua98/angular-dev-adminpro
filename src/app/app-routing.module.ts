import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { NopagesfoundComponent } from './nopagesfound/nopagesfound.component';
import { PagesComponent } from './pages/pages.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';
import { isAuthenticatedGuard } from './auth/guards/is-authenticated.guard';

const routes: Routes = [
  { 
    path: 'dashboard',
    canActivate: [isAuthenticatedGuard],
    loadChildren: () => import ('./pages/pages.module').then((m) => m.PagesModule)
  },
  {
    path: 'auth',
    loadChildren: () => import ('./auth/auth.module').then((m) => m.AuthModule)
  },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: NopagesfoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
