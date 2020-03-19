import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LayoutComponent} from './layout/layout.component';


const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [
    {
      path: 'companies',
      loadChildren: () =>
        import('./pages/companies/companies.module').then(m => m.CompaniesModule)
    },
    {
      path: '**',
      redirectTo: 'companies'
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
