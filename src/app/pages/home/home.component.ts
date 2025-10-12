import { Component } from '@angular/core';
import { CardsComponent } from "../../components/cards/cards.component";
import { PreviewComponent } from "../preview/preview.component";
import { QuizbuttonComponent } from "../../components/quizbutton/quizbutton.component";
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
imports: [CardsComponent, PreviewComponent, QuizbuttonComponent, SinopseComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  reinos: Reino[] = [
  { titulo: 'Lira', guardiao: 'Maria Padilha', imagemSrc: '/lira.png', rota: '/lira' },
  { titulo: 'Natural', guardiao: 'Esdras', imagemSrc: '/natural.png', rota: '/natural' },
  { titulo: 'Cemitério', guardiao: 'O Caveira', imagemSrc: '/cemiterio.png', rota: '/cemiterio' },
  { titulo: 'Encruzilhada', guardiao: 'Sete', imagemSrc: '/encruzilhada.png', rota: '/encruzilhada' },
];;

}
