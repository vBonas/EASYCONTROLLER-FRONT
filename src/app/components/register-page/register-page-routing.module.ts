import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { RegisterPageComponent } from './register-page.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: '', component: RegisterPageComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterPageRoutingModule {}
