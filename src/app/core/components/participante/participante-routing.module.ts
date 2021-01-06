import { ParticipanteCreateComponent } from './participante-create/participante-create.component';
import { ParticipanteReadComponent } from './participante-read/participante-read.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

    /* concatena com o categories/'' . vai cair na lista
    {//direciona para o modulo CategoriesModule
      path: 'categories', loadChildren: '.\core\view\categories\categories.module#CategoriesModule'
      funcionou assim: 
       path: 'categories', loadChildren: () => import('./core/view/categories/categories.module').then(m => m.CategoriesModule)
    }*/

    { path: '', component: ParticipanteReadComponent },
    { path: 'new', component: ParticipanteCreateComponent },
    { path: 'update/:id', component: ParticipanteCreateComponent },

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ParticipanteRoutingModule { }
