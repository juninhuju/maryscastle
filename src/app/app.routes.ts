import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { QuizComponent } from './pages/quiz/quiz.component';
import { LivroComponent } from './components/livro/livro.component';
import { CarouselComponent } from './pages/carousel/carousel.component';
import { AuthorComponent } from './pages/author/author.component';
import { DownloadComponent } from './pages/download/download.component';
import { CadsPageComponent } from './components/cads-page/cads-page.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Livro: O Castelo das Marias'
    },
    {
        path: 'quiz',
        component: QuizComponent,
        title: 'Quiz'
    },
    {
        path: 'livro',
        component: LivroComponent,
        title: 'Primeiro Capítulo'
    },
    {
        path: 'carousel',
        component: CarouselComponent,
        title: 'Imagens'
    },
    {
        path: 'author',
        component: AuthorComponent,
        title: 'Autor'
    },
    { 
        path: 'downloads', 
        component: DownloadComponent,
        title: 'Recursos para Download' 
    },
    {
        path: 'cemiterio',
        loadComponent: () => import('./pages/kingdoms/cemiterio/cemiterio.component')
                            .then(m => m.CemiterioComponent),
        title: 'Cemitério'
    },
    {
        path: 'encruzilhada',
        loadComponent: () => import('./pages/kingdoms/encruzilhada/encruzilhada.component')
                            .then(m => m.EncruzilhadaComponent),
        title: 'Encruzilhada'
    },
    {
        path: 'lira',
        loadComponent: () => import('./pages/kingdoms/lira/lira.component')
                            .then(m => m.LiraComponent),
        title: 'Lira'
    },
    {
        path: 'natural',
        loadComponent: () => import('./pages/kingdoms/natural/natural.component')
                            .then(m => m.NaturalComponent),
        title: 'Natural'
    },
    {
        path: 'reinos',
        component: CadsPageComponent,
        title: 'Reinos'
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];
