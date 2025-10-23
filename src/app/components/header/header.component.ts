import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  standalone: true, 
  imports: [RouterLink, NgbCollapseModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  
  isMenuCollapsed = true;

  collapseMenu(): void {
    this.isMenuCollapsed = true;
  }
}