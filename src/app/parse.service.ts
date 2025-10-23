import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

let Parse: any = null;

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeParse();
  }

  private initializeParse() {
    if (isPlatformBrowser(this.platformId)) {
      import('parse').then(ParseModule => {
          Parse = ParseModule.default;

          const APP_ID = 'SUA_APPLICATION_ID_AQUI'; 
          const JAVASCRIPT_KEY = 'SUA_JAVASCRIPT_KEY_AQUI';
          const SERVER_URL = 'https://parseapi.back4app.com';

          Parse.initialize(APP_ID, JAVASCRIPT_KEY);
          (Parse as any).serverURL = SERVER_URL;

          console.log('Parse SDK Inicializado no Browser.');
      }).catch(err => {
          console.error('Falha ao carregar o módulo Parse:', err);
      });
    } else {
        console.log('Parse SDK ignorado no Servidor (SSR).');
    }
  }
  
  async getTestData() {
    if (!Parse) {
        console.warn('Parse não inicializado. Rodando no servidor ou inicialização falhou.');
        return []; 
    }
    const TestClass = Parse.Object.extend('TestClass');
    const query = new Parse.Query(TestClass);
    try {
      const results = await query.find();
      return results;
    } catch (error) {
      console.error('Erro ao buscar dados do Parse:', error);
      throw error;
    }
  }
}