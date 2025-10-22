import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario, ComentarioResponse } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
    
    // REMOVIDO: APPLICATION_ID e JAVASCRIPT_KEY (agora estão no parse.interceptor.ts)
    
    // Manter a URL completa em uma constante (string literal)
    private readonly API_URL_COMPLETA = 'https://parseapi.back4app.com/classes/Comentario'; 

    // REMOVIDO: private readonly BASE_SERVER_URL
    // REMOVIDO: private readonly CLASS_NAME

    constructor(private http: HttpClient) { }
    
    // Este método é mantido, mas não será mais usado no GET para evitar a falha de interpolação
    private getClassUrl(): string {
        return this.API_URL_COMPLETA; 
    }

    // 1. GET (Ler todos os comentários)
    getComentarios(): Observable<ComentarioResponse> {
        // CORREÇÃO FINAL: Usar a string literal 'https://parseapi.back4app.com/classes/Comentario'
        // Isso garante que o valor correto não se perca no runtime do SSR.
        const URL_LITERAL = 'https://parseapi.back4app.com/classes/Comentario';
        return this.http.get<ComentarioResponse>(URL_LITERAL);
    }

    // 2. POST (Criar um novo comentário)
    addComentario(nome: string, texto: string): Observable<any> {
        const body = {
            nome: nome,
            texto: texto
        };
        const URL_LITERAL = 'https://parseapi.back4app.com/classes/Comentario';
        return this.http.post(URL_LITERAL, body); // Usando a URL COMPLETA
    }

    // 3. DELETE (Excluir um comentário pelo ID)
    deleteComentario(objectId: string): Observable<any> {
        const URL_LITERAL = 'https://parseapi.back4app.com/classes/Comentario';
        const url = `${URL_LITERAL}/${objectId}`; // Usando a URL COMPLETA
        return this.http.delete(url);
    }
}
