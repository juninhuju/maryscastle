import { CommonModule } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { RouterLink, ActivatedRoute } from "@angular/router";

interface Reino {
  rota: any[];
  queryParams?: Record<string, any>;
  titulo: string;
  guardiao: string;
  imagemSrc: string;
}

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss'] // corrigido: styleUrls (plural)
})
export class CardsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const aba = params['aba'];
      // lógica para abrir a aba correta
      console.log("Aba selecionada:", aba);
    });
  }

  @Input() reinos: Reino[] = [
    {
      titulo: 'Cemitério',
      guardiao: 'Caveira',
      imagemSrc: 'cemiterio.jpeg',
      rota: ['/reinos'],
      queryParams: { aba: 'cemiterio' }
    },
    {
      titulo: 'Encruzilhada',
      guardiao: 'Sete',
      imagemSrc: 'encruzilhada.jpeg',
      rota: ['/reinos'],
      queryParams: { aba: 'encruzilhada' }
    },
    {
      titulo: 'Lira',
      guardiao: 'Maria Padilha',
      imagemSrc: 'lira.jpeg',
      rota: ['/reinos'],
      queryParams: { aba: 'lira' }
    },
    {
      titulo: 'Natural',
      guardiao: 'Esdras',
      imagemSrc: 'natural.jpeg',
      rota: ['/reinos'],
      queryParams: { aba: 'natural' }
    },
  ];
}
