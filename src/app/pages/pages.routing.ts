import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { canMatchGuard, isAuthenticatedGuard } from '../auth/guards/is-authenticated.guard';

const routes: Routes = [
    {
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [isAuthenticatedGuard],
        canMatch: [canMatchGuard],
        loadChildren: () => import('./child-routes.module').then(m => m.ChildRoutesModule)
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
