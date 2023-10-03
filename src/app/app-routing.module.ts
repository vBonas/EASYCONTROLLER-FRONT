import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LaplaceControllerDomainComponent } from './components/laplace-controller-domain/laplace-controller-domain.component';
import { TimeControllerDomainComponent } from './components/time-controller-domain/time-controller-domain.component';

const routes: Routes = [
  {
    path: 'laplace',
    component: LaplaceControllerDomainComponent,
    // loadChildren: () =>
    //   import(
    //     './components/laplace-controller-domain/laplace-controller-domain.module'
    //   ).then((m) => m.LaplaceControllerDomainModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import(
        './components/time-controller-domain/time-controller-domain.module'
      ).then((m) => m.TimeControllerDomainModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
