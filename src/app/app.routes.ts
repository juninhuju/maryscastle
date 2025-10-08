import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
        {
        path: '',
        component: HomeComponent,
        title: 'Livro: O Castelo das Marias'
    },
    {
        path: 'cemiterio',
        loadComponent: () => import('../app/pages/kingdoms/cemiterio/cemiterio.component')
                            .then(m => m.CemiterioComponent),
        title: 'Cemitério'
    },
    {
        path: 'encruzilhada',
        loadComponent: () => import('../app/pages/kingdoms/encruzilhada/encruzilhada.component')
                            .then(m => m.EncruzilhadaComponent),
        title: 'Encruzilhada'
    },
    {
        path: 'lira',
        loadComponent: () => import('../app/pages/kingdoms/lira/lira.component')
                            .then(m => m.LiraComponent),
        title: 'Lira'
    },
    {
        path: 'natural',
        loadComponent: () => import('../app/pages/kingdoms/natural/natural.component')
                            .then(m => m.NaturalComponent),
        title: 'Natural'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
