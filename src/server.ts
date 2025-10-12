import { CommonEngine } from '@angular/ssr/node';
import { render } from '@netlify/angular-runtime/common-engine.mjs';

// As importações a seguir não são estritamente necessárias para o handler do Netlify,
// mas as mantemos para garantir que a construção do bundle funcione,
// assumindo que 'bootstrap' (main.server) é referenciado implicitamente no build.
import bootstrap from './main.server'; 
// import { AppServerModule } from './src/main.server'; // Removido, pois geralmente é redundante se bootstrap for usado
// import { environment } from './src/environments/environment'; // Removido, pois não é usado aqui

// Inicializa o CommonEngine. A função netlifyCommonEngineHandler o utiliza para renderizar a app.
const commonEngine = new CommonEngine();

/**
 * Funções e variáveis relacionadas à inicialização do servidor Express local
 * (como serverDistFolder, browserDistFolder, indexHtml, app, app.get, app.listen)
 * foram REMOVIDAS daqui, pois o Netlify assume a responsabilidade de roteamento e servidor.
 */

/**
 * Handler de Requisições para o Netlify.
 * * O plugin '@netlify/angular-runtime' espera encontrar e exportar esta função,
 * que segue o padrão de função sem servidor (Serverless Function) do Netlify.
 * * @param request O objeto Request da requisição recebida.
 * @param context O contexto de execução do Netlify.
 * @returns Uma Promise que resolve para o objeto Response (o HTML renderizado).
 */
export async function netlifyCommonEngineHandler(request: Request, context: any): Promise<Response> {
  // A função 'render' do Netlify lida com a maior parte da lógica de SSR,
  // usando o 'commonEngine' que criamos.
  return await render(commonEngine);
}
