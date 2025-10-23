import { Component } from '@angular/core';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common'; 

interface ImageSlide {
  id: number;
  extension: string; 
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
  
  private readonly BASE_PATH: string = '/carrossel';

  public slides: ImageSlide[] = [
    { id: 1, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 1' },
    { id: 2, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 2' },
    { id: 3, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 3' },
    { id: 4, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 4' },
    { id: 5, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 5' },
    { id: 6, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 6' },
    { id: 7, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 7' },
    { id: 8, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 8' },
    { id: 9, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 9' },
    { id: 10, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 10' },
    { id: 11, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 11' },
    { id: 12, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 12' },
    { id: 13, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 13' },
    { id: 14, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 14' },
    { id: 15, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 15' },
    { id: 16, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 16' },
    { id: 17, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 17' },
    { id: 18, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 18' },
    { id: 19, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 19' },
    { id: 20, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 20' },
    { id: 21, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 21' },
    { id: 22, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 22' },
    { id: 23, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 23' },
    { id: 24, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 24' },
    { id: 25, extension: 'jpeg', alt: 'Imagem do Reino Cemitério 25' }
  ];

  public getImagePath(id: number, extension: string): string {
    return `${this.BASE_PATH}/${id}.${extension}`;
  }
}