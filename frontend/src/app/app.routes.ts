import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
    },

    {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    },
    {
        path: 'search',
        loadChildren: () => import('./search/search.module').then((m) => m.SearchModule),
    },
    {
        path: 'news',
        loadChildren: () => import('./news/news.module').then((m) => m.NewsModule),
    },
    {
        path: 'place/:id',
        component: EntrepriseComponent,
    },
    {
        path: '**',
        component: NotFoundComponent,
    },
];
