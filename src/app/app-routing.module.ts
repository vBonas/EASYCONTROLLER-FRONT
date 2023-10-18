import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login-page/login-page.module').then(
        (m) => m.LoginPageModule
      ),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./components/register-page/register-page.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'laplace',
    loadChildren: () =>
      import(
        './components/laplace-controller-domain/laplace-controller-domain.module'
      ).then((m) => m.LaplaceControllerDomainModule),
  },
  {
    path: 'tempo',
    loadChildren: () =>
      import(
        './components/time-controller-domain/time-controller-domain.module'
      ).then((m) => m.TimeControllerDomainModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
