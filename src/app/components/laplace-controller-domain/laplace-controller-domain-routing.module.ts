import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from '../../app.component';
import { LaplaceControllerDomainComponent } from './laplace-controller-domain.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [{ path: '', component: LaplaceControllerDomainComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaplaceControllerDomainRoutingModule {}
