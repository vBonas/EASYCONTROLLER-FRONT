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
import { RegisterPageComponent } from './register-page.component';
import { RegisterPageRoutingModule } from './register-page-routing.module';

import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [RegisterPageComponent],
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
    RegisterPageRoutingModule,
    MatToolbarModule,
  ],

  providers: [],
})
export class RegisterPageModule {}
