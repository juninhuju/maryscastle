import { ApplicationConfig, provideZoneChangeDetection, InjectionToken } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 

import { routes } from './app.routes';
import { parseInterceptor } from './parse.interceptor'; // Caminho para o Interceptor
import { ComentarioService } from './services/comentario.service'; // Importa o Serviço

// 🔑 DEFINIÇÃO DO TOKEN DE INJEÇÃO
// Este token injeta a URL completa no ComentarioService.
export const PARSE_API_URL = new InjectionToken<string>('PARSE_API_URL'); 

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

    // 2. PROVIDER DA URL DE INJEÇÃO
    { provide: PARSE_API_URL, useValue: 'https://parseapi.back4app.com/classes/Comentario' },
    
    // 3. PROVIDERS HTTP (Inclui fetch e o Interceptor de Autenticação)
    provideHttpClient(
      withFetch(), // Para usar a API fetch nativa
      withInterceptors([parseInterceptor]) // REGISTRA O INTERCEPTOR COM AS CHAVES!
    ), 
    
    // 4. PROVIDER DE SERVIÇOS
    ComentarioService, // Torna o serviço injetável
    
    // 5. PROVIDERS DE HYDRATION
    provideClientHydration(withEventReplay())
  ]
};
