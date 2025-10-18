// Caminho do arquivo: src/app/comentario/comentario.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Mantenha, usado no template (ngFor, etc.)
import { FormsModule } from '@angular/forms'; // Mantenha, usado no template (ngModel)
import { ComentarioService } from '../../comentario.service'; // Ajuste o caminho se necessário
import { Comentario } from '../../models/comentario.model'; // Ajuste o caminho se necessário
// 1. CORREÇÃO DO CAMINHO: Assumindo que parse.service.ts está em src/app/
import { ParseService } from '../../parse.service'; 

@Component({
  selector: 'app-comentario',
  // 2. CORREÇÃO DO STANDALONE COMPONENT: Serviços NÃO vão em 'imports:'.
  // Apenas CommonModule e FormsModule são necessários aqui para o template.
  imports: [CommonModule, FormsModule], 
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss',
  standalone: true // Se não estiver explícito, adicione, já que você está usando 'imports'
})
export class ComentarioComponent implements OnInit {
  comentarios: Comentario[] = [];
  novoComentario = { nome: '', texto: '' };
  isLoading = false;

  // 3. INJEÇÃO DO SERVIÇO: Adicionar o ParseService ao construtor
  constructor(
    private comentarioService: ComentarioService,
    private parseService: ParseService // Injeção do ParseService
  ) { }

  ngOnInit(): void {
    this.carregarComentarios();
    this.loadData();
  }

  carregarComentarios(): void {
    this.isLoading = true;
    this.comentarioService.getComentarios().subscribe({
      next: (data) => {
        // Ordena para exibir o mais recente primeiro, se desejar
        this.comentarios = data.results.sort((a, b) => {
          // Garante que ambos os objetos tenham createdAt para ordenação
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
        // Remove o comentário da lista localmente (mais rápido que recarregar)
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
      // Lidar com o erro de forma apropriada (por exemplo, exibir uma mensagem)
    }
  }
}