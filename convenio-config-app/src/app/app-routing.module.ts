import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ConvenioLayoutConfigComponent} from './convenio-layout-config/convenio-layout-config.component';
import {ConfigLayoutListComponent} from './convenio-layout-list/convenio-layout-list';

export const routes: Routes = [
  {
    path: 'cadastro',
    component: ConvenioLayoutConfigComponent
  },
  {
    path: '',
    redirectTo: '/cadastro',
    pathMatch: 'full'
  },
  {
    path : 'consulta',
    component : ConfigLayoutListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
