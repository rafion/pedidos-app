
import { ReactiveFormsModule } from '@angular/forms'
import { FormsModule } from '@angular/forms';



import { ParticipanteModule } from './components/participante/participante.module';
import { LayoutModule } from './layout/layout.module';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './view/home/home.component'

import { ParticipanteCrudComponent } from './view/participante-crud/participante-crud.component';
import { ParticipanteCreateComponent } from './components/participante/participante-create/participante-create.component';

import { NgxMaskModule } from 'ngx-mask'



@NgModule({
  declarations: [

    HomeComponent
  ],
  imports: [
    ParticipanteModule,
    LayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule.forRoot(),




  ],
  exports: [
    ParticipanteModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskModule


  ]
})
export class CoreModule { }
