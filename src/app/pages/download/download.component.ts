import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.scss'] 
})
export class DownloadComponent implements OnInit {
  public carrosselImages: string[] = [];
  public basePath = 'carrossel'; 
  public capituloPdf = 'livro.pdf';
  public musicaMagua = 'magua.mp3';
  public musicaBalada = 'maguaremix.mp3'; 

  ngOnInit(): void {
    for (let i = 1; i <= 25; i++) {
      this.carrosselImages.push(`${i}.jpeg`);
    }
  }

  downloadFile(fileName: string): void {
    console.log(`Iniciando download de: ${fileName}`);
    const fullPath = this.basePath + fileName;
    const link = document.createElement('a');
    link.href = fullPath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
