import { Component } from '@angular/core';
import { CemiterioComponent } from '../../pages/kingdoms/cemiterio/cemiterio.component';
import { EncruzilhadaComponent } from '../../pages/kingdoms/encruzilhada/encruzilhada.component';
import { LiraComponent } from '../../pages/kingdoms/lira/lira.component';
import { NaturalComponent } from '../../pages/kingdoms/natural/natural.component';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-cads-page',
  imports: [CemiterioComponent, EncruzilhadaComponent, LiraComponent, NaturalComponent, MatTabsModule],
  templateUrl: './cads-page.component.html',
  styleUrl: './cads-page.component.scss'
})
export class CadsPageComponent {

}
