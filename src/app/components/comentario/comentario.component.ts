import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../models/comentario.model';

@Component({
  selector: 'app-comentario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.scss']
})
export class ComentarioComponent implements OnInit, OnChanges {
  @Input() comentarios: Comentario[] = [];

  novoComentario = { nome: '', texto: '' };
  isLoading = false;

  mostrarTodos = false;
  comentariosVisiveis: Comentario[] = [];

  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.atualizarComentariosVisiveis();
  }

  ngOnChanges(): void {
    this.atualizarComentariosVisiveis();
  }

  carregarComentarios(): void {
    this.isLoading = true;
    this.comentarioService.getComentarios().subscribe({
      next: (data: { results: Comentario[] }) => {
        this.comentarios = data.results.sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.atualizarComentariosVisiveis();
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Erro ao recarregar comentários:', err);
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
        this.novoComentario = { nome: '', texto: '' };
        this.carregarComentarios();
      },
      error: (err: any) => {
        console.error('Erro ao adicionar comentário:', err);
        alert('Erro ao adicionar comentário.');
      }
    });
  }

  expandirComentarios(): void {
    this.mostrarTodos = !this.mostrarTodos;
    this.atualizarComentariosVisiveis();
  }

  atualizarComentariosVisiveis(): void {
    this.comentariosVisiveis = this.mostrarTodos
      ? this.comentarios
      : this.comentarios.slice(0, 6);
  }
}
