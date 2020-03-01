import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ResumoQuitacaoComponent} from './resumo-quitacao/resumo-quitacao.component';

export const routes: Routes = [
  {
    path: 'home',
    component: ResumoQuitacaoComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
