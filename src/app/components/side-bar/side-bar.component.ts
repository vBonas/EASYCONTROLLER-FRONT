import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'side-nav',
  styleUrls: ['./side-bar.component.css'],
  templateUrl: './side-bar.component.html',
  animations: [
    trigger('menuAnimation', [
      state('open', style({ width: '250px' })),
      state('closed', style({ width: '60px' })),
      transition('open => closed', animate('1s ease-in-out')),
      transition('closed => open', animate('1s ease-in-out')),
    ]),
  ],
})
export class SideBarComponent {
  @Input() isExpanded!: boolean;
  @Output() toggleMenu = new EventEmitter();
}
