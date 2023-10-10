import { Component, ViewEncapsulation } from '@angular/core';
import { LoaderService } from 'src/app/loader.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingComponent {
  constructor(public loader: LoaderService) {}
}
