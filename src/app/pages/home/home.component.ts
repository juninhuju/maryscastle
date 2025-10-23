import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from "../../components/cards/cards.component";
import { PreviewComponent } from "../preview/preview.component"; 
import { QuizbuttonComponent } from "../../components/quizbutton/quizbutton.component"; 
import { SinopseComponent } from '../../components/sinopse/sinopse.component'; 
import { ComentarioComponent } from "../../components/comentario/comentario.component"; 
import { ComentarioService } from '../../services/comentario.service';
import { Comentario } from '../../models/comentario.model'; 

interface Reino {
  titulo: string;
  guardiao: string;
  imagemSrc: string;
  rota: string;
}

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [ 
    CommonModule, 
    CardsComponent, 
    PreviewComponent, 
    QuizbuttonComponent, 
    SinopseComponent, 
    ComentarioComponent, 
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  comentariosData: Comentario[] | null = null; 
  isLoadingComentarios: boolean = true; 
  
  constructor(private comentarioService: ComentarioService) {}

  ngOnInit(): void {
    this.fetchComentarios();
  }

  fetchComentarios() {
    this.isLoadingComentarios = true;
    
    this.comentarioService.getComentarios().subscribe({
      next: (response) => {
        this.comentariosData = response.results.sort((a: Comentario, b: Comentario) => 
             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },
      error: (err) => {
        console.error('Erro ao carregar comentários:', err);
        this.comentariosData = []; 
      },
      complete: () => {
        this.isLoadingComentarios = false; 
      }
    });
  }

  reinos: Reino[] = [
    { titulo: 'Lira', guardiao: 'Maria Padilha', imagemSrc: '/lira.jpeg', rota: '/lira' },
    { titulo: 'Natural', guardiao: 'Esdras', imagemSrc: '/natural.jpeg', rota: '/natural' },
    { titulo: 'Cemitério', guardiao: 'Caveira', imagemSrc: '/cemiterio.jpeg', rota: '/cemiterio' },
    { titulo: 'Encruzilhada', guardiao: 'Sete', imagemSrc: '/encruzilhada.jpeg', rota: '/encruzilhada' },
  ];
}
