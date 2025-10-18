import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true, // Adicionado 'standalone: true' que estava faltando
  imports: [RouterLink, NgbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isMenuCollapsed = true;

  // AGORA ESTÁ DENTRO DA CLASSE E ACESSÍVEL PELO TEMPLATE
  collapseMenu(): void {
    this.isMenuCollapsed = true;
  }
}