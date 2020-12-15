import { CategoryFormComponent } from './category-form/category-form.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  /* concatena com o categories/'' . vai cair na lista
  {//direciona para o modulo CategoriesModule
    path: 'categories', loadChildren: '.\core\view\categories\categories.module#CategoriesModule'
    funcionou assim: 
     path: 'categories', loadChildren: () => import('./core/view/categories/categories.module').then(m => m.CategoriesModule)
  }*/

  { path: '', component: CategoryListComponent },
  { path: 'new', component: CategoryFormComponent },
  { path: ':id/edit', component: CategoryListComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
