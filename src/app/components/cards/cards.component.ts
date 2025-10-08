import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

interface Reino {
  titulo: string;
  guardiao: string;
  imagemSrc: string;
  rota: string;
}

@Component({
  selector: 'app-cards',
  imports: [RouterLink, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() reinos: Reino[] = [];
}
