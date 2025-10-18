import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http'; 
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

    // 2. PROVIDERS GLOBAIS
    // CORREÇÃO: Chamando provideHttpClient com a feature withFetch()
    provideHttpClient(withFetch()), 

    // 3. PROVIDERS DE HYDRATION
    provideClientHydration(withEventReplay())
  ]
};
