import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },

    {
        path: 'Auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
