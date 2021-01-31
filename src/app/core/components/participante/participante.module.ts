import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ParticipanteRoutingModule } from './participante-routing.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { ParticipanteDeleteDialogComponent } from './participante-delete-dialog/participante-delete-dialog.component';
import { ParticipanteCreateComponent } from './participante-create/participante-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipanteUpdateComponent } from './participante-update/participante-update.component';
import { ParticipanteReadComponent } from './participante-read/participante-read.component';

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
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { NgxMaskModule } from 'ngx-mask';
import { NgBrazil } from 'ng-brazil';
import { ParticipanteEnderecoDialogComponent } from './participante-endereco-dialog/participante-endereco-dialog.component';
import { ParticipanteContatoDialogComponent } from './participante-contato-dialog/participante-contato-dialog.component'


@NgModule({
  declarations: [
    ParticipanteUpdateComponent,
    ParticipanteReadComponent,
    ParticipanteCreateComponent,
    ParticipanteDeleteDialogComponent,
    ParticipanteEnderecoDialogComponent,
    ParticipanteContatoDialogComponent
  ],
  imports: [
    CommonModule,
    ParticipanteRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgBrazil,
    TextMaskModule,
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
    MatDialogModule,
    MatProgressBarModule,
    MatProgressSpinnerModule

  ],
  exports: [
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    TextMaskModule,
    MatRadioModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    NgxMaskModule,
    NgBrazil,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule
  ]
})
export class ParticipanteModule { }
