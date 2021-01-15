
//import { ParticipanteCreateComponent } from './core/components/participante/participante-create/participante-create.component';
import { HomeComponent } from './core/view/home/home.component';
import { LayoutComponent } from './core/layout/layout.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent, children: [
      {
        path: 'home', component: HomeComponent
      },

      { path: '', redirectTo: '/home', pathMatch: 'full' },

      {
        path: 'participantes', //component: ParticipanteCreateComponent
        loadChildren: () => import('./core/components/participante/participante.module').then(m => m.ParticipanteModule)
      },

      {//direciona para o modulo CategoriesModule
        path: 'categories', loadChildren: () => import('./core/view/categories/categories.module').then(m => m.CategoriesModule)

        //'./core/view/categories/categories.module#CategoriesModule'
      },
      {
        path: 'produtos', //component: ParticipanteCreateComponent
        loadChildren: () => import('./core/components/produto/produto.module').then(m => m.ProdutoModule)
      },
    ],



  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
