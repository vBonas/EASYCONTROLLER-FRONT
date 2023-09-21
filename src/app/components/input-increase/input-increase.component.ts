import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-increase',
  templateUrl: './input-increase.component.html',
  styleUrls: ['./input-increase.component.css'],
})
export class InputIncreaseComponent {
  @Input() title!: string;
  @Input() valor!: number;
  @Output() valorChange: EventEmitter<number> = new EventEmitter<number>();

  emitirValor() {
    this.valorChange.emit(this.valor);
  }
}
