import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
//mat-toolbar
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [LandingPageComponent],
  imports: [
    FormsModule,
    MatExpansionModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatSnackBarModule,
    LandingPageRoutingModule,
    MatToolbarModule,
  ],

  providers: [],
})
export class LandingPageModule {}
