import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioResponse } from '../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
    
    private readonly API_URL_COMPLETA = 'https://parseapi.back4app.com/classes/Comentario'; 

    constructor(private http: HttpClient) { }
    
    private getClassUrl(): string {
        return this.API_URL_COMPLETA; 
    }

    getComentarios(): Observable<ComentarioResponse> {
        const URL_LITERAL = 'https://parseapi.back4app.com/classes/Comentario';
        return this.http.get<ComentarioResponse>(URL_LITERAL);
    }

    addComentario(nome: string, texto: string): Observable<any> {
        const body = {
            nome: nome,
            texto: texto
        };
        const URL_LITERAL = 'https://parseapi.back4app.com/classes/Comentario';
        return this.http.post(URL_LITERAL, body); 
    }

    deleteComentario(objectId: string): Observable<any> {
        const URL_LITERAL = 'https://parseapi.back4app.com/classes/Comentario';
        const url = `${URL_LITERAL}/${objectId}`;
        return this.http.delete(url);
    }
}
