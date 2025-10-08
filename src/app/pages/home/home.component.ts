import { Component } from '@angular/core';
import { CardsComponent } from "../../components/cards/cards.component";
import { PreviewComponent } from "../preview/preview.component";
import { QuizComponent } from "../quiz/quiz.component";
import { SinopseComponent } from '../../components/sinopse/sinopse.component';
import { CommonModule } from '@angular/common';

interface Reino {
  titulo: string;
  guardiao: string;
  imagemSrc: string;
  rota: string;
}

@Component({
  selector: 'app-home',
  imports: [CardsComponent, PreviewComponent, QuizComponent, SinopseComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  reinos: Reino[] = [
  { titulo: 'Lira', guardiao: 'Maria Padilha', imagemSrc: '/Lira 2.1.png', rota: '/lira' },
  { titulo: 'Natural', guardiao: 'Esdras', imagemSrc: '/Naturais 2.1.png', rota: '/natural' },
  { titulo: 'Cemitério', guardiao: 'O Caveira', imagemSrc: '/Cemitério 2.1.jpg', rota: '/cemiterio' },
  { titulo: 'Encruzilhada', guardiao: 'Sete', imagemSrc: '/Encruza 2.1.jpeg', rota: '/encruzilhada' },
];;

}
