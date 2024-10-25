import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';
import { UsersComponent } from './mantenimientos/users/users.component';
import { DoctorsComponent } from './mantenimientos/doctors/doctors.component';
import { HospitalsComponent } from './mantenimientos/hospitals/hospitals.component';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [isAuthenticatedGuard],
        children: [
            { path: '', component: DashboardComponent, data: {titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data: {titulo: 'ProgressBar'} },
            { path: 'grafica1', component: Grafica1Component, data: {titulo: 'Grafica #1'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: {titulo: 'Tema'} },
            { path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: {titulo: 'RxJS'} },
            { path: 'profile', component: ProfileComponent, data: {titulo: 'Profile'}},
            // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

            //Mantenimientos
            {path: 'users', component: UsersComponent, data: {titulo: 'Users Application'}},
            {path: 'doctors', component: DoctorsComponent, data: {titulo: 'Doctors Application'}},
            {path: 'hospitals', component: HospitalsComponent, data: {titulo: 'Hospitals Application'}},
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
