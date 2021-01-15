import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { NgBrazil } from 'ng-brazil';


import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoCreateComponent } from './produto-create/produto-create.component';
import { ProdutoReadComponent } from './produto-read/produto-read.component';


@NgModule({
  declarations: [ProdutoCreateComponent, ProdutoReadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgBrazil,
    ProdutoRoutingModule,
    MaterialModule
  ]
})
export class ProdutoModule { }
