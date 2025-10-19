import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    // 1. PROVIDERS DE ROTEAMENTO
    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),

    // 2. PROVIDERS HTTP (Corrigido: Inclui fetch e interceptor em uma única chamada)
    provideHttpClient(
      withFetch(), // Para usar a API fetch nativa (Recomendado no Angular 19+)
    ), 

    // 3. PROVIDERS DE HYDRATION
    provideClientHydration(withEventReplay())
  ]
};
