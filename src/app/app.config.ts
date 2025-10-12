import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    
    // 👇 A função withInMemoryScrolling deve ser o segundo argumento de provideRouter
    provideRouter(
      routes,
      withInMemoryScrolling({
        // Define que a posição de rolagem será restaurada para o topo [0, 0]
        scrollPositionRestoration: 'top', 
        // Permite a rolagem para âncoras (fragmentos de URL como #secao)
        anchorScrolling: 'enabled',
      })
    ), 
    
    provideClientHydration(withEventReplay())
  ]
};