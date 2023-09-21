import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  svgPath = '/assets/svg/tt.svg'; // Substitua pelo caminho correto do seu arquivo SVG

  title = 'aula-0teste';
  public isExpanded = true;

  public toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }
}
