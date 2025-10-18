// src/app/models/comentario.model.ts

export interface Comentario {
  // --- Campos Padrão do Back4App (Parse Server) ---

  /** * ID Único gerado pelo Back4App. 
   * Essencial para as operações de LEITURA (GET) e EXCLUSÃO (DELETE).
   */
  objectId: string;

  /** * Data em que o objeto foi criado no servidor. 
   * Útil para ordenação da lista (mais recente primeiro).
   */
  createdAt: string;

  /** * Data da última atualização.
   */
  updatedAt: string;
  
  // --- Seus Campos Personalizados ---

  /** * O nome da pessoa que fez o comentário.
   */
  nome: string;

  /** * O corpo do comentário.
   */
  texto: string;
}

// --- Interface para a Resposta da Lista (GET) ---

// Quando você faz um GET para listar todos os comentários (Ex: GET /classes/Comentario),
// o Back4App retorna um objeto que contém um array chamado 'results'.
export interface ComentarioResponse {
    results: Comentario[];
}