// src/app/parse.service.ts

import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Nota: Não precisamos do 'parse/node' aqui, pois o objetivo é pular a inicialização no servidor.
let Parse: any = null;

@Injectable({
  providedIn: 'root'
})
export class ParseService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initializeParse();
  }

  private initializeParse() {
    // Verifica se estamos no ambiente do navegador (client-side)
    if (isPlatformBrowser(this.platformId)) {
      // Importa o Parse SDK de forma dinâmica, mas na prática, você deve usar a importação estática se o bundler for inteligente.
      // Neste caso, vamos apenas garantir que a importação estática funcione, já que você usa o 'parse' instalado via npm.
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
  
  // O método deve verificar se Parse foi inicializado antes de ser usado.
  async getTestData() {
    if (!Parse) {
        console.warn('Parse não inicializado. Rodando no servidor ou inicialização falhou.');
        return []; // Retorna um array vazio ou lança um erro, se preferir
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