import { ProdutoReadComponent } from './produto-read/produto-read.component';
import { ProdutoCreateComponent } from './produto-create/produto-create.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: ProdutoReadComponent },
  { path: 'new', component: ProdutoCreateComponent },
  { path: 'update/:id', component: ProdutoCreateComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
