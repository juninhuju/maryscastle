import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; 
import { routes } from './app.routes'; 


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 1. PROVIDERS DE ROTEAMENTO
    // 👇 withInMemoryScrolling é o segundo argumento de provideRouter
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),

    // 2. PROVIDERS GLOBAIS
    // 👇 provideNgBootstrap() e provideHttpClient() são adicionados aqui, no array principal
    provideHttpClient(), // Se esta função for necessária, ela fica aqui.

    // 3. PROVIDERS DE HYDRATION
    provideClientHydration(withEventReplay())
  ]
};