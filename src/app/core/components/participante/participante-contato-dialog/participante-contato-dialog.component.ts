import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Contato } from '../../../model/Contato.model';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-participante-contato-dialog',
  templateUrl: './participante-contato-dialog.component.html',
  styleUrls: ['./participante-contato-dialog.component.css']
})
export class ParticipanteContatoDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ParticipanteContatoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public contato: Contato

  ) { }

  ngOnInit(): void {
    this.contato.tipo = 'PESSOAL'
  }


  cancel(): void {
    this.dialogRef.close();
  }

}
