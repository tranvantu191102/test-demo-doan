import { Routes } from '@angular/router';
import { LoginComponent } from './modules';
import { HomeComponent } from './modules/page';

export const routes: Routes = [
    {
        path: "",
        pathMatch: 'full',
        redirectTo: 'login'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'home',
        component: HomeComponent
    }
];
