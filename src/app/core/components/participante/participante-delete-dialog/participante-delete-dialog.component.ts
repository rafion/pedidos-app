import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Participante } from './../../../model/Participante.model';
import { ParticipanteService } from './../../../service/participante.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ParticipanteResumoDTO } from '../participante-read/participante-resumo.model';

@Component({
  selector: 'app-participante-delete-dialog',
  templateUrl: './participante-delete-dialog.component.html',
  styleUrls: ['./participante-delete-dialog.component.css']
})
export class ParticipanteDeleteDialogComponent implements OnInit {



  constructor(private participanteService: ParticipanteService,
    public dialogRef: MatDialogRef<ParticipanteDeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public participante: ParticipanteResumoDTO) { }

  ngOnInit(): void {
  }


}
