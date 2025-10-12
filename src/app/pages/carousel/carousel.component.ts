// carousel.component.ts

import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; 

// Interface para estruturar os dados da imagem
interface ImageSlide {
  id: number;
  extension: string; // Ex: 'png', 'jpg', 'jpeg'
  alt: string;
}

@Component({
  selector: 'app-carousel',
  imports: [NgbCarouselModule, CommonModule],
  standalone: true, 
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.scss'
})
export class CarouselComponent {
  
  // 1. Defina o Caminho Base correto
  // Se os arquivos estão em 'src/public/carrossel', o caminho público é '/carrossel'
  private readonly BASE_PATH: string = '/carrossel';

  // 2. Lista completa das 25 imagens com suas extensões (mantida)
  public slides: ImageSlide[] = [
    { id: 1, extension: 'png', alt: 'Imagem do Reino Cemitério 1' },
    { id: 2, extension: 'png', alt: 'Imagem do Reino Cemitério 2' },
    { id: 3, extension: 'png', alt: 'Imagem do Reino Cemitério 3' },
    { id: 4, extension: 'png', alt: 'Imagem do Reino Cemitério 4' },
    { id: 5, extension: 'png', alt: 'Imagem do Reino Cemitério 5' },
    { id: 6, extension: 'png', alt: 'Imagem do Reino Cemitério 6' },
    { id: 7, extension: 'png', alt: 'Imagem do Reino Cemitério 7' },
    { id: 8, extension: 'png', alt: 'Imagem do Reino Cemitério 8' },
    { id: 9, extension: 'png', alt: 'Imagem do Reino Cemitério 9' },
    { id: 10, extension: 'png', alt: 'Imagem do Reino Cemitério 10' },
    { id: 11, extension: 'png', alt: 'Imagem do Reino Cemitério 11' },
    { id: 12, extension: 'png', alt: 'Imagem do Reino Cemitério 12' },
    { id: 13, extension: 'png', alt: 'Imagem do Reino Cemitério 13' },
    { id: 14, extension: 'png', alt: 'Imagem do Reino Cemitério 14' },
    { id: 15, extension: 'png', alt: 'Imagem do Reino Cemitério 15' },
    { id: 16, extension: 'png', alt: 'Imagem do Reino Cemitério 16' },
    { id: 17, extension: 'png', alt: 'Imagem do Reino Cemitério 17' },
    { id: 18, extension: 'png', alt: 'Imagem do Reino Cemitério 18' },
    { id: 19, extension: 'png', alt: 'Imagem do Reino Cemitério 19' },
    { id: 20, extension: 'png', alt: 'Imagem do Reino Cemitério 20' },
    { id: 21, extension: 'png', alt: 'Imagem do Reino Cemitério 21' },
    { id: 22, extension: 'png', alt: 'Imagem do Reino Cemitério 22' },
    { id: 23, extension: 'png', alt: 'Imagem do Reino Cemitério 23' },
    { id: 24, extension: 'png', alt: 'Imagem do Reino Cemitério 24' },
    { id: 25, extension: 'png', alt: 'Imagem do Reino Cemitério 25' }
  ];

  // 3. Método para gerar o caminho correto
  public getImagePath(id: number, extension: string): string {
    // Retorna '/carrossel/1.png' (Exemplo)
    return `${this.BASE_PATH}/${id}.${extension}`;
  }
}