// Caminho do arquivo: src/app/comentario/comentario.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 
import { ComentarioService } from '../../services/comentario.service'; 
import { Comentario } from '../../models/comentario.model'; 
import { ParseService } from '../../parse.service'; 

// Adicione os imports do Router e RxJS
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-comentario',
  // Componentes Standalone precisam de seus módulos e a lógica de rota.
  imports: [CommonModule, FormsModule], 
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss',
  standalone: true 
})
export class ComentarioComponent implements OnInit {
  comentarios: Comentario[] = [];
  novoComentario = { nome: '', texto: '' };
  isLoading = false;

  constructor(
    private comentarioService: ComentarioService,
    private parseService: ParseService,
    private router: Router // Injeção do Router
  ) { }

  ngOnInit(): void {
    // 1. Carregamento inicial (ao entrar na página pela primeira vez)
    this.carregarComentarios();
    this.loadData();
    
    // 2. CORREÇÃO: Lógica para recarregar a API quando o usuário volta para esta rota.
    // Isso evita o problema de componente reutilizado (cache de rota).
    this.router.events.pipe(
      // Filtra apenas quando a navegação termina com sucesso
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // **Ajuste:** Defina o caminho correto para a sua página de comentários/home.
      // Neste exemplo, verifica-se a rota raiz ('/') ou a rota 'home'.
      if (event.urlAfterRedirects === '/' || event.urlAfterRedirects.startsWith('/home')) {
        this.carregarComentarios(); // Recarrega os dados da API
        console.log('Comentários Recarregados após evento de navegação para a Home/Rota.');
      }
    });
  }

  carregarComentarios(): void {
    this.isLoading = true;
    this.comentarioService.getComentarios().subscribe({
      next: (data) => {
        // Ordena para exibir o mais recente primeiro
        this.comentarios = data.results.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar comentários:', err);
        this.isLoading = false;
      }
    });
  }

  adicionarComentario(): void {
    if (!this.novoComentario.nome || !this.novoComentario.texto) {
      alert('Por favor, preencha o nome e o comentário.');
      return;
    }

    this.comentarioService.addComentario(this.novoComentario.nome, this.novoComentario.texto).subscribe({
      next: () => {
        alert('Comentário adicionado com sucesso!');
        this.novoComentario = { nome: '', texto: '' }; // Limpa o formulário
        this.carregarComentarios(); // Recarrega a lista para mostrar o novo comentário
      },
      error: (err) => {
        console.error('Erro ao adicionar comentário:', err);
        alert('Erro ao adicionar comentário.');
      }
    });
  }

  excluirComentario(objectId: string): void {
    if (!confirm('Tem certeza que deseja excluir este comentário?')) {
      return;
    }

    this.comentarioService.deleteComentario(objectId).subscribe({
      next: () => {
        alert('Comentário excluído com sucesso!');
        // Remove o comentário da lista localmente
        this.comentarios = this.comentarios.filter(c => c.objectId !== objectId);
      },
      error: (err) => {
        console.error('Erro ao excluir comentário:', err);
        alert('Erro ao excluir comentário.');
      }
    });
  }

  // Função que usa o ParseService
  async loadData() {
    try {
      const data = await this.parseService.getTestData();
      console.log('Dados do Parse (Teste):', data);
    } catch (error) {
      console.error('Erro ao carregar dados de teste do Parse:', error);
    }
  }
}