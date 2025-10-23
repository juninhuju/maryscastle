export interface Comentario {
  objectId: string;
  createdAt: string;
  updatedAt: string;
  nome: string;
  texto: string;
}
export interface ComentarioResponse {
    results: Comentario[];
}