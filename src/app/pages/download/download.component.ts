import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './download.component.html',
  // Assumindo que você usará o nome de arquivo 'download.component.css'
  styleUrls: ['./download.component.scss'] 
})
export class DownloadComponent implements OnInit {

  // Array para gerar os links das 25 imagens do carrossel
  public carrosselImages: string[] = [];

  // Caminhos relativos para os arquivos
  // IMPORTANTE: Ajuste este caminho ('/public/Carrossel') conforme a estrutura de assets do seu projeto.
  public basePath = 'carrossel'; 
  
  // Nomes dos arquivos de download
  public capituloPdf = 'livro.pdf';
  public musicaMagua = 'magua.mp3';
  
  // Variável que o HTML usa para o link do remix, corrigindo o erro original
  public musicaBalada = 'maguaremix.mp3'; 

  ngOnInit(): void {
    // Popula o array com os 25 nomes de arquivos de imagem (1.png a 25.png)
    for (let i = 1; i <= 25; i++) {
      this.carrosselImages.push(`${i}.jpeg`);
    }
  }

  /**
   * Função opcional para lidar com downloads de forma programática.
   * Não é estritamente necessária para links simples [href], mas é útil para lógica complexa.
   */
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
