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
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { DecimalNumberDirective } from '../onlyDecimal.directive';
import { BrowserModule } from '@angular/platform-browser';
import { SpinnerComponent } from '../spinner/spinner.component';
import { LoadingInterceptor } from '../loading.interceptor';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//MatSnackBarModule
import { MatSnackBarModule } from '@angular/material/snack-bar';

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
    //NgbModule,
    //NgbDropdownModule,
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
