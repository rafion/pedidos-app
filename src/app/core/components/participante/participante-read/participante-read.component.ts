import { ParticipanteDeleteDialogComponent } from './../participante-delete-dialog/participante-delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ParticipanteService } from './../../../service/participante.service';
import { PARTICIPANTE } from './../participante.mock';
import { Participante } from './../../../model/Participante.model';
import { Component, OnInit } from '@angular/core';
import { ParticipanteResumoDTO } from './participante-resumo.model';

@Component({
  selector: 'app-participante-read',
  templateUrl: './participante-read.component.html',
  styleUrls: ['./participante-read.component.css']
})
export class ParticipanteReadComponent implements OnInit {

  participantes: Participante[]; // = PARTICIPANTE;
  participanteResumoDTO: ParticipanteResumoDTO[];
  displayedColumns = ['id', 'nome', 'cidade', 'telefone', 'email', 'action'];


  constructor(private participanteService: ParticipanteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.atualizaTabela();

  }

  atualizaTabela(): void {
    this.participanteService.readTable().subscribe(participantes => {
      this.participanteResumoDTO = participantes
      //console.log(this.participantes)
    })
  }

  openDeleteDialog(participante) {
    const dialogRef = this.dialog.open(ParticipanteDeleteDialogComponent, {
      data: { id: participante.id, nome: participante.nome, municipio: participante.municipio, telefone: participante.telefone }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('id para deletar:' + participante.id);
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.deleteParticipante(participante.id);
      }
    });
  }

  deleteParticipante(id) {
    this.participanteService.deleteById(id).subscribe(() => {
      this.participanteService.showMessage("Cadastro excluido com sucesso");
      //this.contatos = Array.from(this.contatos);
      this.atualizaTabela();
    }, errorResponse => {
      this.participanteService.showMessage(errorResponse.error.message, true)
    })
  }

  /*
    deleteParticipante(event): void {
      if (window.confirm('Deseja Mesmo deleter o registro')) {
        event.confirm.resolve();
      } else {
        event.confirm.reject();
      }
    }
  
  */


}
