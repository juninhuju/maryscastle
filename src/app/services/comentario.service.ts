import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
    
    // Suas chaves (Verifique no Back4App que a chave de baixo é a JAVASCRIPT KEY)
    private readonly APPLICATION_ID = 'ZjTsB45A8NzYtNy0LuAGc37bImSEPtA75PGMCPOR'; 
    private readonly JAVASCRIPT_KEY = 'DzsqmWwUbPLdp3mQtkqq4E7owYY4ISVOfH9sn3iQ'; // <-- OBRIGATÓRIO SER A JAVASCRIPT KEY

    // Base da URL do servidor Parse
    private readonly BASE_SERVER_URL = 'https://parseapi.back4app.com/classes/';
    
    // Nome da classe que você está acessando
    private readonly CLASS_NAME = 'Comentario';

    private httpOptions = {
        headers: new HttpHeaders({
            'X-Parse-Application-Id': this.APPLICATION_ID,
            // 🔑 CORREÇÃO CRÍTICA: Use X-Parse-JavaScript-Key para o frontend
            'X-Parse-JavaScript-Key': this.JAVASCRIPT_KEY, 
            'Content-Type': 'application/json'
        })
    };

    constructor(private http: HttpClient) { }
    
    // URL completa da classe
    private getClassUrl(): string {
        return `${this.BASE_SERVER_URL}${this.CLASS_NAME}`;
    }

    // 1. GET (Ler todos os comentários)
    getComentarios(): Observable<{ results: Comentario[] }> {
        // GET para: https://parseapi.back4app.com/classes/Comentario
        return this.http.get<{ results: Comentario[] }>(this.getClassUrl(), this.httpOptions);
    }

    // 2. POST (Criar um novo comentário)
    addComentario(nome: string, texto: string): Observable<any> {
        const body = {
            nome: nome,
            texto: texto
        };
        // POST para: https://parseapi.back4app.com/classes/Comentario
        return this.http.post(this.getClassUrl(), body, this.httpOptions);
    }

    // 3. DELETE (Excluir um comentário pelo ID)
    deleteComentario(objectId: string): Observable<any> {
        // DELETE para: https://parseapi.back4app.com/classes/Comentario/objectId
        const url = `${this.getClassUrl()}/${objectId}`;
        return this.http.delete(url, this.httpOptions);
    }
}