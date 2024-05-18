import { Routes } from '@angular/router';
import { LoginComponent } from './modules';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        redirectTo: ''
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        loadChildren: () => import('./modules/page/home/home.module').then(_ => _.HomeModule)
    }
];
