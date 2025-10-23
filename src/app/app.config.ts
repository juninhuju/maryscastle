import { ApplicationConfig, provideZoneChangeDetection, InjectionToken } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http'; 
import { routes } from './app.routes';
import { parseInterceptor } from './parse.interceptor'; 
import { ComentarioService } from './services/comentario.service'; 

export const PARSE_API_URL = new InjectionToken<string>('PARSE_API_URL'); 

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      })
    ),

    { provide: PARSE_API_URL, useValue: 'https://parseapi.back4app.com/classes/Comentario' },
    
    provideHttpClient(
      withFetch(), 
      withInterceptors([parseInterceptor]) 
    ), 
    
    ComentarioService, 
    
    provideClientHydration(withEventReplay())
  ]
};
