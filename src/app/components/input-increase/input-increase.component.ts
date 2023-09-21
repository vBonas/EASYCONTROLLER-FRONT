import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-increase',
  templateUrl: './input-increase.component.html',
  styleUrls: ['./input-increase.component.css'],
})
export class InputIncreaseComponent {
  @Input() title!: string;
  valor: number = 1;

  aumentar() {
    this.valor++;
  }

  diminuir() {
    if (this.valor > 0) {
      this.valor--;
    }
  }
}
