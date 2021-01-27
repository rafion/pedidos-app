import { ProdutoModule } from './components/produto/produto.module';
import { SharedModule } from './../shared/shared.module';

import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';



import { ParticipanteModule } from './components/participante/participante.module';
import { LayoutModule } from './layout/layout.module';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './view/home/home.component'

import { ParticipanteCrudComponent } from './view/participante-crud/participante-crud.component';
import { ParticipanteCreateComponent } from './components/participante/participante-create/participante-create.component';

import { NgxMaskModule } from 'ngx-mask';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { TextMaskModule } from 'angular2-text-mask';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    ParticipanteModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    SharedModule,
    ProdutoModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatRadioModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule




  ],
  exports: [
    ParticipanteModule,
    ProdutoModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule


  ]
})
export class CoreModule { }
