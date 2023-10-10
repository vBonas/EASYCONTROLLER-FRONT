import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PlotlyModule } from 'angular-plotly.js';
import * as PlotlyJS from 'plotly.js-dist-min';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoadingInterceptor } from 'src/app/loading.interceptor';
import { LaplaceControllerDomainComponent } from './laplace-controller-domain.component';
import { LaplaceControllerDomainService } from './laplace-controller-domain.service';
import { LaplaceControllerDomainRoutingModule } from './laplace-controller-domain-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LoadingComponent } from '../loading/loading.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [LoadingComponent, LaplaceControllerDomainComponent],
  imports: [
    FormsModule,
    MatExpansionModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    PlotlyModule,
    HttpClientModule,
    ClipboardModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
    LaplaceControllerDomainRoutingModule,
  ],

  providers: [
    LaplaceControllerDomainService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
})
export class LaplaceControllerDomainModule {}
