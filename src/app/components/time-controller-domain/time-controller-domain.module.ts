import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeControllerDomainComponent } from './time-controller-domain.component';
import { TimeControllerDomainRoutingModule } from './time-controller-domain-routing.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TimeControllerDomainService } from './time-controller-domain.service';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { SpinnerComponent } from '../spinner/spinner.component';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DecimalNumberDirective } from 'src/app/onlyDecimal.directive';
import { LoadingInterceptor } from 'src/app/loading.interceptor';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    TimeControllerDomainComponent,
    DecimalNumberDirective,
    SpinnerComponent,
  ],
  imports: [
    FormsModule,
    MatExpansionModule,
    CommonModule,
    TimeControllerDomainRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    PlotlyModule,
    HttpClientModule,
    ClipboardModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
  ],

  providers: [
    TimeControllerDomainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class TimeControllerDomainModule {}
